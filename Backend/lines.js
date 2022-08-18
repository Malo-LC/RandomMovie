const fs = require('fs');

function getLines() {
  try {
    // read contents of the file
    const data = fs.readFileSync('movieIDS.json', 'UTF-8');
    // split the contents by new line
    const lines = data.split(/\r?\n/);
    return lines;
  } catch (err) {
    console.error(err);
  }
}

module.exports = getLines();
