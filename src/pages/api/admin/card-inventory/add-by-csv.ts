import type { NextApiRequest, NextApiResponse } from 'next';
import { APICard } from '../../../../types/card';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APICard[] | string>
) {
  try {
    console.log(req.body.data);
  } catch (error) {
    console.error(error);
    res.status(500).json('Something has gone wrong on the server.');
  }
}
