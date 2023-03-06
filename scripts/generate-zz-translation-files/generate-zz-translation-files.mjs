import "zx/globals";

const ns = ["common","advisor"];
const basePath = "../app/public/locales/";
ns.forEach((ns) => {
  const data = JSON.parse(fs.readFileSync(`${basePath}en/${ns}.json`, "utf8"));
  console.log(`muly:`, { data });

  const zz = {};

  const duplicateKey = (zz, data) => {
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        zz[key] = "[" + "z".repeat(data[key].length) + "]";
      } else {
        zz[key] = {};
        duplicateKey(zz[key], data[key]);
      }
    });
  };

  duplicateKey(zz, data);

  fs.writeFileSync(`${basePath}zz/${ns}.json`, JSON.stringify(zz, null, 2));
});
