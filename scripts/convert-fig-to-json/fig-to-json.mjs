// yarn fig-to-json --fileName=small-sample
// yarn fig-to-json --fileName=smapy

import { figToJson } from "./fig2json.js";
import "zx/globals";

const { fileName } = argv;

const target = `../design/figma-json/${fileName}.json`;
const buffer = fs.readFileSync(`../design/figma/${fileName}.fig`);
const json = figToJson(buffer);
fs.writeFileSync(target, JSON.stringify(json, null, 2), "utf8");

console.log(`SAVED ${fileName}`, {});

// const blobs = json.blobs.map((blob: any) => {
//   return { bytes: Uint8Array.from(atob(blob), (c) => c.charCodeAt(0)) }
// })
//
// console.log(`muly:`, { json })
