import axios from 'axios';
import Papa from 'papaparse';
import { Card } from '../types/card';

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
    const newCard: Card = {
      quantity: value.Quantity,
      name: value.Name,
      set: value.Set,
      cardNumber: value.CardNumber,
      setCode: value.SetCode,
      rarity: value.Rarity,
      printing: value.Printing,
      condition: value.Condition,
    };

    convertedData.push(newCard);
  }

  return convertedData;
};

const addNewCards = async (csvData: string) => {
  const cardsData = await convertFromStringToCsv(csvData);

  console.log(cardsData);

  if (!cardsData) {
    throw new Error('There was an error when trying to add the cards.');
  }

  console.log('provider', cardsData);

  axios.post('http://localhost:3001/cards', {
    data: cardsData,
  });
};

export { addNewCards };
