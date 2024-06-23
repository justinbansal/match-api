import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

import logos from './luxuryCarLogos.js';
import animals from './animals.js';

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/luxury', (req, res) => {
  res.send(logos);
})

app.get('/animals', (req, res) => {
  res.send(animals);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
