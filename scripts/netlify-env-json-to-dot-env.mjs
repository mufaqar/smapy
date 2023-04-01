#!/usr/bin/env zx

// zx ./scripts/netlify-env-json-to-dot-env.mjs --envName=staging

const { envName } = argv;

const values = await fs.readJson(`.env-${envName}.json`);

await fs.outputFileSync(
  `.env-${envName}`,
  Object.keys(values)
    .map((key) => {
      const value = values[key];
      return `${key}=${value}`;
    })
    .join('\n')
);
