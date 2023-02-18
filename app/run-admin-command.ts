import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// console.log(`muly:`, { env: process.env });

import { executeAdminCommand } from "./src/server/process/admin-commands";
import * as minimist from "minimist";
// import * as colorize from 'json-colorizer';
// const colorize = require('json-colorizer');
import superjson from "superjson";
import { writeFileSync } from "fs";
const jclrz = require("json-colorz");

// jclrz.level.show = true
// jclrz.level.spaces = 2
// jclrz.level.start = 6

const start = async () => {
  const argv = minimist.default(process.argv.slice(2));
  const { _, cmd, ...args } = argv;

  // console.log(`muly:start`, { argv, args });
  return await executeAdminCommand(cmd, args);
};

start()
  .then((answer) => {
    console.log(`DONE ${answer.message || answer}`);
    const { json } = superjson.serialize(answer.results || answer);
    writeFileSync(
      "./last-run-admin-command.json",
      JSON.stringify(answer, null, 2)
    );
    try {
      jclrz(json);
    } catch (err: any) {
      console.log(`FAILED to used jclrz`, { err: err.stack });
      console.log(json);
    }
  })
  .catch((err: unknown) => {
    console.error(`ERROR`, { err });
  });
