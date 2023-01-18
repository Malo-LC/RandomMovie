const express = require("express");
const cors = require("cors");
const app = express();
const { getLinesFilms, getLinesActors } = require("./lines");
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

const Films = getLinesFilms();
const Acteurs = getLinesActors();

app.get("/film/randomId", (req, res) => {
  const rand = Math.floor(Math.random() * (Films.length + 1));
  const jsonedLine = JSON.parse(Films[rand]);
  return res.status(200).json(jsonedLine.id);
});

app.get("/acteur/randomId", (req, res) => {
  const rand = Math.floor(Math.random() * (Acteurs.length + 1));
  const jsonedLine = JSON.parse(Acteurs[rand]);
  return res.status(200).json(jsonedLine.id);
});

app.get("/", (req, res) => {
  res.json("Server is up and running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
