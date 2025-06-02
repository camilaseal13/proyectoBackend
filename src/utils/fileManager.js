
const fs = require("fs").promises;

async function readFileJSON(path) {
  const data = await fs.readFile(path, "utf-8");
  return JSON.parse(data);
}

async function writeFileJSON(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = {
  readFileJSON,
  writeFileJSON,
};
