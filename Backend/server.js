const express = require('express');
const cors = require('cors');
const app = express();
const { getLinesFilms, getLinesActors } = require('./lines');
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
  })
);

const Films = getLinesFilms();
const Acteurs = getLinesActors();

app.get('/film/randomId', (req, res) => {
  let min = Math.ceil(0);
  let max = Math.floor(Films.length);
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  const jsonedLine = JSON.parse(Films[rand]);
  res.json(jsonedLine.id);
});

app.get('/acteur/randomId', (req, res) => {
  let min = Math.ceil(0);
  let max = Math.floor(Acteurs.length);
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  const jsonedLine = JSON.parse(Acteurs[rand]);
  res.json(jsonedLine.id);
});

// Creating a readable stream from file
// readline module reads line by line
// but from a readable stream only.

app.get('/', (req, res) => {
  res.json('Server is up and running');
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000');
});
