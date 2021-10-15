import type { NextApiRequest, NextApiResponse } from 'next';
import AddCardsByName from '../../../../src/components/admin/panels/add-cards-by-name';
import {
  addNewCards,
  getCardsFromAPI,
} from '../../../../src/controllers/card-controller';
import { APICard } from '../../../../src/types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APICard[] | string>
) {
  try {
    console.log(req.body.data);
    const success = await addNewCards(req.body.data);
  } catch (error) {
    console.error(error);
    res.status(500).json('Something has gone wrong on the server.');
  }
}
