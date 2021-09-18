const express = require('express');
const cors = require('cors');
const path = require('path');
import { Request, Response, Router } from 'express';
import CardController from './controllers/card-controller';

const PORT = process.env.PORT || 3001;
const app = express();
const router = Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/cards', (req: Request, res: Response) => {
  const controller = new CardController();
  controller.addNewCards(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
