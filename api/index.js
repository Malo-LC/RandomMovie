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

app.get("/film/randomId", async (req, res) => {
  const Films = await getLinesFilms();
  if (!Films) return res.status(500).json("Error while fetching films");

  const rand = Math.floor(Math.random() * (Films.length + 1));

  return res.status(200).json(Films[rand].id);
});

app.get("/acteur/randomId", async (req, res) => {
  const Acteurs = await getLinesActors();
  if (!Acteurs) return res.status(500).json("Error while fetching actors");

  const rand = Math.floor(Math.random() * (Acteurs.length + 1));

  return res.status(200).json(Acteurs[rand].id);
});

const date = new Date();

app.get("/", (req, res) => {
  res.json({ message: "Server is up and running", lastDeploy: date });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
