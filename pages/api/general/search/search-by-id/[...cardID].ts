import type { NextApiRequest, NextApiResponse } from 'next';
import { getCardByCardID } from '../../../../../controllers/card-controller';
import { Card } from '../../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card | string>
) {
  try {
    const responseCard = await getCardByCardID(
      Number.parseInt(req.query.parameter.toString())
    );

    if (typeof responseCard != 'string' && responseCard) {
      return res.status(200).json(responseCard);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
