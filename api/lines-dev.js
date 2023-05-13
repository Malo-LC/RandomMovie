const fs = require("fs");
const fetch = require("node-fetch");
const gunzip = require("gunzip-file");
const date = new Date();
const movieName = `movie_ids_${date.getUTCMonth() + 1 < 10 ? "0" + parseInt(date.getUTCMonth() + 1) : date.getUTCMonth() + 1}_${date.getUTCDate()}_${date.getFullYear()}.json.gz`;
const actorName = `person_ids_${date.getUTCMonth() + 1 < 10 ? "0" + parseInt(date.getUTCMonth() + 1) : date.getUTCMonth() + 1}_${date.getUTCDate()}_${date.getFullYear()}.json.gz`;

async function getLinesFilms() {
  try {
    if (!fs.existsSync("movieIDS.json")) {
      const data = await transformGzToJson(movieName, "movieIDS.json");
      return data;
    } else {
      const data = fs.readFileSync("movieIDS.json", "UTF-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(err);
  }
}

async function downloadDaily() {
  if (!fs.existsSync(movieName)) {
    console.log("Movie file not found, downloading...");
    const res = await fetch(`http://files.tmdb.org/p/exports/${movieName}`);
    const gzFile = fs.createWriteStream(movieName);
    await res.body.pipe(gzFile);
    console.log("Movie file downloaded");
    if (fs.existsSync("movieIDS.json")) {
      fs.unlinkSync("movieIDS.json");
      console.log("Old actors file deleted");
    }
  } else {
    console.log("Movie file already exists");
  }
  if (!fs.existsSync(actorName)) {
    console.log("Actors file not found, downloading...");
    const res = await fetch(`http://files.tmdb.org/p/exports/${actorName}`);
    const gzFile = fs.createWriteStream(actorName);
    await res.body.pipe(gzFile);
    console.log("Actors file downloaded");
    if (fs.existsSync("personIDS.json")) {
      fs.unlinkSync("personIDS.json");
      console.log("Old actors file deleted");
    }
  } else {
    console.log("Actors file already exists");
  }
}

async function getLinesActors() {
  try {
    if (!fs.existsSync("personIDS.json")) {
      const data = await transformGzToJson(actorName, "personIDS.json");
      return data;
    } else {
      const data = fs.readFileSync("personIDS.json", "UTF-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(err);
  }
}

function transformGzToJson(name, to) {
  return new Promise((resolve, reject) =>
    gunzip(name, "./" + to, (err) => {
      if (err) console.log(err);
      console.log("File unzipped");
      fs.readFile(to, "UTF-8", (err, data) => {
        if (err) console.log(err);
        data = "[" + data.replace(/\r?\n/g, ",") + "]";
        data = data.slice(0, -2) + "]";
        fs.writeFile(to, data, "UTF-8", (err) => {
          if (err) console.log(err);
          let json = fs.readFileSync(to, "UTF-8");
          json = JSON.parse(json);
          json = json.filter((item) => item.popularity > 5);
          json = json.map((item) => item.id);
          fs.writeFile(to, JSON.stringify(json), "UTF-8", (err) => {
            if (err) console.log(err);
            console.log(json.length);
            resolve(json);
          });
        });
      });
    })
  );
}

module.exports = { getLinesFilms, getLinesActors, downloadDaily };
