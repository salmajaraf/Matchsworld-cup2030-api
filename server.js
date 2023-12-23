const PORT = process.env.PORT || 8000;

const express = require("express");
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json("Welcome to the World Cup 2030 API");
});

// Stadiums
app.get('/matches', (req, res) => {
  fs.readFile('Matches.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
      return;
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.get('/matches/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('Matches.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur serveur');
      return;
    }
    const dataFormat = JSON.parse(data);
    const infoMatche = dataFormat.filter(matche => matche.id == id)[0];
    if (infoMatche) {
      res.json(infoMatche);
    } else {
      res.status(404).send('not found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
