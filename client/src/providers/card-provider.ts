import axios from 'axios';
import Papa from 'papaparse';
import { APICard, Cardset } from '../types/api-card';
import { APIDetails, CardImage, CardSet } from '../types/api-details';
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

  public addNewCard = async (newCard: Card) => {
    const cardData: Card[] = [];
    cardData.push(newCard);

    const apiURL = 'http://localhost:3001';
    await axios.post(`${apiURL}/cards`, {
      data: cardData,
    });
  };

  public getAllCards = async (): Promise<Card[] | string> => {
    try {
      const apiURL = 'http://localhost:3001';
      const response = await axios.get(`${apiURL}/cards`, {});

      const allCards = response.data;

      return allCards;
    } catch (error) {
      console.error(error);
      return 'Please Try Again';
    }
  };

  public getAllCardsByPartialName = async (
    partialName: string
  ): Promise<Card[] | string> => {
    try {
      const apiURL = 'http://localhost:3001';
      const response = await axios.get(
        `${apiURL}/cards/byPartialName/${partialName}`
      );

      const allCards = response.data;

      return allCards;
    } catch (error) {
      console.error(error);
      return 'Please try again';
    }
  };

  public getCardByID = async (cardID: number): Promise<Card | string> => {
    try {
      const apiURL = 'http://localhost:3001';
      const response = await axios.get(`${apiURL}/cards/byID/${cardID}`);

      const allCards = response.data;

      return allCards[0];
    } catch (error) {
      console.error(error);
      return 'Please try again';
    }
  };

  public getCardsFromAPI = async (
    cardName: string
  ): Promise<APICard[] | string> => {
    try {
      const apiURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
      const response = await axios.get(`${apiURL}?fname=${cardName}`);

      const responseCards = response.data.data;

      const allCards: APICard[] = [];

      for (const card of responseCards) {
        if (card.card_sets) {
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
      }

      return allCards;
    } catch (error) {
      console.error(error);
      return 'Something has gone wrong retrieving the card data. Please try again.';
    }
  };

  public getCardFromAPI = async (
    cardName: string
  ): Promise<APIDetails | undefined> => {
    try {
      const apiURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
      const response = await axios.get(`${apiURL}?name=${cardName}`);

      const cardData = response.data.data;
      const cardImages: CardImage[] = [];
      const cardSets: CardSet[] = [];

      for (const image of cardData[0].card_images) {
        const newImage: CardImage = {
          id: image.id,
          imageUrl: image.image_url,
        };

        cardImages.push(newImage);
      }

      for (const set of cardData[0].card_sets) {
        const newSet: CardSet = {
          setName: set.set_name,
          setCode: set.set_code,
          setRarity: set.set_rarity,
          setPrice: set.set_price,
        };

        cardSets.push(newSet);
      }

      const cardDetails: APIDetails = {
        name: cardData[0].name,
        cardImages: cardImages,
        cardSets: cardSets,
      };

      return cardDetails;
    } catch (error) {
      console.error(error);
    }
  };

  public getAPIID = async (
    setName: string,
    cardName: string
  ): Promise<number> => {
    const response = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=${setName}`
    );

    const responseData = response.data.data;

    let apiID = 0;

    for (const data of responseData) {
      if (data.name === cardName) {
        apiID = data.id;
        break;
      }
    }

    return apiID;
  };

  public updateCard = async (cardID: number, price: number, apiID: number) => {
    const apiURL = 'http://localhost:3001';
    await axios.put(`${apiURL}/cards`, {
      data: { cardID, price, apiID },
    });
  };
}
export default CardProvider;
