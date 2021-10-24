import axios from 'axios';
import { Card } from '../types/card';

const getAllInternalCardsByPartialName = async (
  partialName: string
): Promise<Card[] | string> => {
  try {
    const response: any = await axios.get(
      `/api/general/search/by-partial-name/${partialName}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return 'Something has gone wrong while getting the card data.';
  }
};

export default getAllInternalCardsByPartialName;
