require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const { getLinesFilms, getLinesActors } = require("./lines");
// const { getLinesFilms, getLinesActors, downloadDaily } = require("./lines-dev");
// downloadDaily();
app.use(express.json());
const API_KEY = process.env.API_KEY;
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.get("/film/randomId", async (req, res) => {
  const films = await getLinesFilms();
  if (!films) return res.status(500).json("Error while fetching films");

  const rand = Math.floor(Math.random() * (films.length + 1));

  return res.status(200).json(films[rand]);
});

app.get("/acteur/randomId", async (req, res) => {
  const acteurs = await getLinesActors();
  if (!acteurs) return res.status(500).json("Error while fetching actors");

  const rand = Math.floor(Math.random() * (acteurs.length + 1));

  return res.status(200).json(acteurs[rand]);
});

app.get("/movie-db/search", async (req, res) => {
  try {
    const { search } = req.query;
    const movieDbRes = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${search}&page=1`);
    return res.status(200).json(movieDbRes.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error while fetching movie-db");
  }
});

app.get("/movie-db/route", async (req, res) => {
  try {
    const { type, detail } = req.query;
    const movieDbRes = await axios.get(`https://api.themoviedb.org/3/${type}/${detail}?api_key=${API_KEY}&language=fr`);
    return res.status(200).json(movieDbRes.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error while fetching movie-db");
  }
});

app.get("/movie-db/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, detail } = req.query;
    const movieDbRes = await axios.get(`https://api.themoviedb.org/3/${type}/${id}${detail}?api_key=${API_KEY}&language=fr`);
    return res.status(200).json(movieDbRes.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error while fetching movie-db");
  }
});

const date = new Date();

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running", lastDeploy: date });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
