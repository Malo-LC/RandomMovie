const express = require('express');
const cors = require('cors');
const app = express();
const lines = require('./lines');
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  })
);

app.get('/film/randomId', (req, res) => {
  let min = Math.ceil(0);
  let max = Math.floor(lines.length);
  let rand = Math.floor(Math.random() * (max - min + 1)) + min;
  const jsonedLine = JSON.parse(lines[rand]);
  res.json(jsonedLine.id);
});

// Creating a readable stream from file
// readline module reads line by line
// but from a readable stream only.

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
