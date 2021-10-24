import axios from 'axios';
import { Card } from '../types/card';

const getAllInternalCards = async (): Promise<Card[] | string> => {
  try {
    const response: any = await axios.get('/api/general/search/get-all-cards');
    return response.data;
  } catch (error) {
    console.error(error);
    return 'Something has gone wrong while getting the card data.';
  }
};

export default getAllInternalCards;
