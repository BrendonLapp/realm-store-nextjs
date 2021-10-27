import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllCards } from '../../../../controllers/card-controller';
import { Card } from '../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[] | string>
) {
  try {
    const responseCard = await getAllCards();

    if (responseCard) {
      return res.status(200).json(responseCard);
    }

    return [];
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
