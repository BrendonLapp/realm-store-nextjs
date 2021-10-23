import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllCardsByPartialName } from '../../../../../controllers/card-controller';
import { Card } from '../../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[] | string>
) {
  try {
    const responseCards = await getAllCardsByPartialName(
      req.query.parameter.toString()
    );

    if (responseCards && typeof responseCards != 'string') {
      return res.status(200).json(responseCards);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
