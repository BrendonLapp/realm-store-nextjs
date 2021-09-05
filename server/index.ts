const express = require('express');
const cors = require('cors');
const path = require('path');
import { Request, Response, Router } from 'express';

const PORT = process.env.PORT || 3001;
const app = express();
const router = Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/cards', (req: Request, res: Response) => {
  console.log('req values', req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
