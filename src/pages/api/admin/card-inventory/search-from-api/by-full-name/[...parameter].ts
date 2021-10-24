import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getCardFromAPI,
  getCardsFromAPI,
} from '../../../../../../controllers/card-controller';
import { APICard, APIDetails } from '../../../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIDetails | string>
) {
  try {
    const responseCards = await getCardFromAPI(req.query.parameter.toString());

    if (responseCards) {
      return res.status(200).json(responseCards);
    }

    return res
      .status(500)
      .json('Something has gone wrong contacting the YGO Pro deck API.');
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
