import axios from 'axios';
import Papa from 'papaparse';
import { ApiResponse, Card } from '../types/card';

const getCardDataFromApi = async (cardNumber: string): Promise<ApiResponse> => {
  if (!cardNumber || cardNumber.includes('LART')) {
    return { apiID: 0, price: 0 };
  }

  const APIUrl = `https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=${cardNumber}`;
  const response = await axios.get(APIUrl);

  const returnData: ApiResponse = {
    apiID: response.data.id,
    price: response.data.set_price,
  };

  return returnData;
};

const convertFromStringToCsv = async (
  csvData: string
): Promise<Card[] | undefined> => {
  if (!csvData) {
    return undefined;
  }

  const parsedData = Papa.parse(csvData, { header: true });
  const stringedData = JSON.stringify(parsedData);
  const jsonData = JSON.parse(stringedData);

  const convertedData: Card[] = [];

  for (const value of jsonData.data) {
    const apiData = await getCardDataFromApi(value.CardNumber);

    const newCard: Card = {
      quantity: value.Quantity,
      name: value.Name,
      set: value.Set,
      cardNumber: value.CardNumber,
      setCode: value.SetCode,
      rarity: value.Rarity,
      printing: value.Printing,
      condition: value.Condition,
      price: apiData.price,
      apiID: apiData.apiID,
      image: `https://storage.googleapis.com/ygoprodeck.com/pics/${apiData.apiID}.jpg`,
    };

    convertedData.push(newCard);
  }

  return convertedData;
};

const addNewCards = async (csvData: string) => {
  const cardsData = await convertFromStringToCsv(csvData);

  if (!cardsData) {
    throw new Error('There was an error when trying to add the cards.');
  }

  for (const card of cardsData) {
    console.log(card);
  }
};

export { convertFromStringToCsv, getCardDataFromApi, addNewCards };
