const fs = require("fs");

async function getLinesFilms() {
  try {
    const data = fs.readFileSync("movieIDS.json", "UTF-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getLinesActors() {
  try {
    const data = fs.readFileSync("personIDS.json", "UTF-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getLinesFilms, getLinesActors };
