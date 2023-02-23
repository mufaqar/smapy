#!/usr/bin/env zx

// yarn db

$.verbose = false;

// console.log(`muly:argv`, { argv });

const { reset } = argv;
const { Client } = require("pg");
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
});

const rule = "right(auth.email(), 12) = '@smapy.co.il'";

client.connect();
const answer = await client.query("SELECT NOW()");
console.log(`ANSWER`, { r: answer.rows });

const tables = ["UserProfile", "SystemEvents", "AdminOperations"];

const noId = [];

const cmd = async (command) => {
  const parts = command.split("\n");
  console.log(`${parts}`);
  return await client.query(command);
};

for (let table of tables) {
  const tableName = `public."${table}"`;
  await cmd(`ALTER TABLE ${tableName} ENABLE ROW LEVEL SECURITY`);

  let exists;
  if (reset) {
    await cmd(
      `DROP POLICY IF EXISTS "policy_admin_${table}_read" on ${tableName}`
    );
    exists = false;
  } else {
    const answer = await cmd(
      `SELECT * FROM pg_policy WHERE polname = 'policy_admin_${table}_read'`
    );
    exists = answer?.rowCount > 0;
  }

  if (!exists) {
    await cmd(`CREATE POLICY "policy_admin_${table}_read"
        ON ${tableName}
        FOR ALL USING (
            ${rule}
        );`);
  }
  // if (!noId.includes(table)) {
  //   await cmd(
  //       `ALTER TABLE ${tableName} alter column id set DEFAULT NULL;`
  //           // `ALTER TABLE ${tableName} alter column id set DEFAULT extensions.uuid_generate_v4();`
  //   );
  // }

  await cmd(`grant usage on schema public to postgres, anon, authenticated, service_role;

              grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
              grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
              grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;
              
              alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
              alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
              alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;`);
}

client.end();
