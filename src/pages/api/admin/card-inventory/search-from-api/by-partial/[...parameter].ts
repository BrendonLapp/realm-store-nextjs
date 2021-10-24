import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardsFromAPI } from '../../../../../../controllers/card-controller';
import { APICard } from '../../../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APICard[] | string>
) {
  try {
    const responseCards = await getCardsFromAPI(req.query.parameter.toString());

    res.status(200).json(responseCards);
  } catch (error) {
    console.error(error);
    res.status(500).json('Something has gone wrong on the server.');
  }
}
