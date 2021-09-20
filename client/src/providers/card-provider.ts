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
      cardName: value.name,
      setName: value.Set,
      cardNumber: value.CardNumber,
      setCode: value.SetCode,
      rarity: value.Rarity,
      printing: value.Printing,
      condition: value.Condition,
      price: 0.0,
      image: 'placeholder',
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

  if (cardsData.length !== 0) {
    await axios.post('http://localhost:3001/cards', {
      data: cardsData,
    });
  }
};

const getAllCards = async (): Promise<Card[]> => {
  const response = await axios.get('http://localhost:3001/cards', {});

  const allCards = response.data;

  return allCards;
};

export { addNewCards, getAllCards };
