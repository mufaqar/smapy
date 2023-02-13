// node ./scripts/convert-translate-yaml-to-figma-patch.mjs

import "zx/globals";

const fileName = "./design/figma-translated/full_parsed.yml";

const t = YAML.parse(fs.readFileSync(fileName, "utf8"));
const root = t[0];

const errors = [];
const out = {};

const readNode = (node) => {
  const oldName = node["old name"];
  const newName = node["new name pascal"];
  const children = node["children"];

  const id = `${node.guid.sessionID}:${node.guid.localID}`;

  const n = { newName, oldName };

  let hasText = false;
  children?.forEach((c) => {
    if (c["new characters"] && c["old characters"]) {
      if (n.textOld) {
        errors.push(id);
      }
      n.textOld = c["old characters"];
      n.textNew = c["new characters"];
      hasText = true;
    }
  });

  const ignore =
    // !hasText ||
    [
      "Vector",
      "Rectangle",
      "Ellipse",
      "Component",
      "Union",
      "Subtract",
      "Group",
    ].find((name) => oldName.startsWith(name)) ||
    oldName === newName;

  if (id === "6677:21157") {
    console.log(`muly:readNode ${id}`, {
      n,
      ignore,
      hasText,
      oldName,
      newName,
    });
  }

  if (!ignore) {
    out[id] = n;
  }
};

console.log(`muly:T`, { t: typeof root, k: Object.keys(root) });
Object.keys(root).forEach((key) => {
  readNode(root[key]);
});

fs.writeFileSync(
  "./design/figma-translated/cleaned.yml",
  YAML.stringify(out),
  "utf8"
);

fs.writeFileSync(
  "./design/figma-translated/full.json",
  JSON.stringify(root, null, 2),
  "utf8"
);

fs.writeFileSync(
  "./design/figma-translated/cleaned.json",
  JSON.stringify(out, null, 2),
  "utf8"
);

if (errors.length > 0) {
  console.log(`ERROR`, { errors });
} else {
  console.log(`DONE`);
}
