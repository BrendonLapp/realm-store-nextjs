import axios from 'axios';
import Papa from 'papaparse';
import { APICard, Cardset } from '../types/api-card';
import { Card } from '../types/card';

class CardProvider {
  public convertFromStringToCsv = async (
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
        cardName: value.Name,
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

  public addNewCards = async (csvData: string) => {
    const cardsData = await this.convertFromStringToCsv(csvData);

    if (!cardsData) {
      throw new Error('There was an error when trying to add the cards.');
    }

    if (cardsData.length !== 0) {
      const apiURL = 'http://localhost:3001';
      await axios.post(`${apiURL}/cards`, {
        data: cardsData,
      });
    }
  };

  public getAllCards = async (): Promise<Card[] | string> => {
    try {
      const apiURL = 'http://localhost:3001';
      const response = await axios.get(`${apiURL}/cards`, {});

      const allCards = response.data;

      console.log(allCards);

      return allCards;
    } catch (error) {
      console.error(error);
      return 'Please Try Again';
    }
  };

  public getCardsFromAPI = async (cardName: string) => {
    try {
      const apiURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
      const response = await axios.get(`${apiURL}?fname=${cardName}`);

      const responseCards = response.data.data;

      const allCards: APICard[] = [];

      for (const card of responseCards) {
        const cardSet: Cardset[] = [];

        for (const set of card.card_sets) {
          const setInfo: Cardset = {
            setCode: set.set_code,
            setName: set.setName,
            setPrice: set.set_price,
            setRarity: set.set_rarity,
          };

          cardSet.push(setInfo);
        }

        const responseCard: APICard = {
          name: card.name,
          image: `https://storage.googleapis.com/ygoprodeck.com/pics/${card.id}.jpg`,
          cardSets: cardSet,
        };

        allCards.push(responseCard);
      }

      console.log(allCards);
    } catch (error) {
      console.error(error);
    }
  };
}
export default CardProvider;
