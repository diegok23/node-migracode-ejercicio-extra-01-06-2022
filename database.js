const fs = require('fs');
const file = './users.json';

function getFile() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}

function saveToFile(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

module.exports = {
  getFile,
  saveToFile
};
