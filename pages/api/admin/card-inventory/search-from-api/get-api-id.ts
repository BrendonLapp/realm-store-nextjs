import type { NextApiRequest, NextApiResponse } from 'next';
import { getAPIID } from '../../../../../controllers/card-controller';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number | string>
) {
  try {
    const setName = req.body.data.setName;
    const name = req.body.data.name;

    const apiID = await getAPIID(setName, name);

    return res.status(200).json(apiID);
  } catch (error) {
    console.error(error);
    return res.status(500).json('Something has gone wrong on the server.');
  }
}
