import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = 3000;

import logos from './luxuryCarLogos.js';
import animals from './animals.js';

app.use(cors({
  origin: ['http://localhost:5173', 'https://justinbansal.github.io'],
  methods: ['GET'],
}));
app.use(express.static(path.join(__dirname, 'public')));

function limitMiddleware(req, res, next) {
  let maxItems = req.query.limit || 5;
  maxItems = parseInt(maxItems);

  if (req.data && Array.isArray(req.data)) {
    req.data = req.data.slice(0, maxItems);
  }
  next();
}

app.get('/', (req, res) => {
  res.send('Match API!');
})

app.get('/luxury', (req, res, next) => {
  req.data = logos;
  next();
}, limitMiddleware, (req, res) => {
  res.json(req.data);
})

app.get('/animals', (req, res, next) => {
  req.data = animals;
  next();
}, limitMiddleware, (req, res) => {
  res.json(req.data);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

export default app;
