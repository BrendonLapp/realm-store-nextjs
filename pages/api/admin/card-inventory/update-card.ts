import type { NextApiRequest, NextApiResponse } from 'next';
import { addNewCardsByCSV } from '../../../../controllers/card-controller';
import { APICard } from '../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APICard[] | string>
) {
  try {
    console.log(req.body.data.imageID);
    return res.status(200);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
