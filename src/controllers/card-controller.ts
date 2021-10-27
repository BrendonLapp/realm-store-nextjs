import axios from 'axios';
import Papa from 'papaparse';
import { checkIfCardExists } from '../lib/check-if-card-exists';
import checkSpecialPrinting from '../lib/check-special-priting';
import pickQuality from '../lib/pick-quality';
import CardRepository from '../repositories/card-repository';
import InventoryRepository from '../repositories/inventory-repository';
import {
  APICard,
  APIDetails,
  ApiResponse,
  Card,
  CardImage,
  Cardset,
  CardSet,
} from '../types/card';
import { Inventory } from '../types/inventory';
import InventoryController from './inventory-controller';

//Collection of Card related business logic

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
    if (value.Name) {
      const newCard: Card = {
        quantity: value.Quantity,
        cardName: value.Name,
        setName: value.Set,
        cardNumber: value.CardNumber,
        setCode: value.SetCode,
        rarity: value.Rarity,
        printing: value.Printing,
        specialPrinting: checkSpecialPrinting(value.Name),
        condition: value.Condition,
        price: 0.0,
        manualSetPrice: false,
        image: 'placeholder',
      };
      convertedData.push(newCard);
    }
  }

  return convertedData;
};

const addNewCardsByCSV = async (csvData: string) => {
  const cardsData = await convertFromStringToCsv(csvData);

  if (!cardsData) {
    throw new Error('There was an error when trying to add the cards.');
  }

  if (cardsData.length !== 0) {
    addNewCards(cardsData);
  }
};

const addNewCards = async (cardsData: Card[]) => {
  const inventoryController = new InventoryController();
  for (const card of cardsData) {
    try {
      const existingCard = await checkIfCardExists(card.cardNumber);

      if (!card.image) {
        const apiID = await getAPIID(card.setName, card.cardName);

        card.image = `https://storage.googleapis.com/ygoprodeck.com/pics/${apiID}.jpg`;
      }

      const qualityID = pickQuality(card.condition);

      if (!existingCard) {
        addCard(card);
      } else {
        if (existingCard[0].cardID && qualityID) {
          await inventoryController.updateInventory(
            existingCard[0].cardID,
            qualityID,
            card.quantity,
            card.printing,
            card.specialPrinting
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};

// public updateCard = async (req: Request, res: Response) => {
//   const cardRepository = new CardRepository();
//   const cardData = req.body.data;
//   const imageURL = `https://storage.googleapis.com/ygoprodeck.com/pics/${cardData.apiID}.jpg`;

//   await cardRepository.updateCard(
//     cardData.cardID,
//     cardData.price,
//     cardData.apiID,
//     imageURL
//   );
// };

const addCard = async (card: Card) => {
  const cardRepository = new CardRepository();
  try {
    setTimeout(async function () {
      const apiResponse: ApiResponse = await getCardDataFromApi(
        card.cardNumber
      );

      console.log(apiResponse);

      card.apiID = apiResponse.apiID;
      card.price = apiResponse.price;
      card.image = `https://storage.googleapis.com/ygoprodeck.com/pics/${apiResponse.apiID}.jpg`;

      if (!card.price) {
        card.price = 0;
      }

      if (card.apiID) {
        const cardID = await cardRepository.insertCard(card);
        card.cardID = cardID;
        addCardToInventory(card);
      }
    }, 500);
  } catch (error) {
    console.error(error);
  }
};

const getAllCards = async (): Promise<Card[] | undefined> => {
  const cardRepository = new CardRepository();

  const allCards = await cardRepository.getCards();

  if (allCards) {
    return allCards;
  }
  return undefined;
};

const getHomePageCards = async (): Promise<Card[]> => {
  const cardRepository = new CardRepository();

  const cards = await cardRepository.getHomePageCards();

  if (cards) {
    return cards;
  }
  return [];
};

const getAllCardsByPartialName = async (
  partialName: string
): Promise<Card[] | undefined> => {
  const cardRepository = new CardRepository();

  const allCards = await cardRepository.getCardsByPartialName(partialName);

  return allCards;
};

const getCardByCardID = async (cardID: number): Promise<Card | undefined> => {
  const cardRepository = new CardRepository();
  const inventoryRepository = new InventoryRepository();

  const allCards = await cardRepository.getCardsByCardID(cardID);

  //need to return an object here that will give all the inventroy of the card ID with all the inventory info.
  //maybe an interface just for this?
  const inventoryLevels = await inventoryRepository.getCardInventoryByCardID(
    cardID
  );

  return allCards;
};

const addCardToInventory = (card: Card) => {
  const inventoryController = new InventoryController();

  const qualityID = pickQuality(card.condition);

  if (card.cardID && qualityID) {
    const inventoryValues: Inventory = {
      cardID: card.cardID,
      qualityID: qualityID,
      quantity: card.quantity,
      printing: card.printing,
      specialPrinting: card.printing,
    };

    inventoryController.addToInventory(inventoryValues);
  }
};

const getCardDataFromApi = async (cardNumber: string): Promise<ApiResponse> => {
  if (!cardNumber || cardNumber.includes('LART')) {
    return { apiID: 0, price: 0 };
  }

  setTimeout(async function () {
    const yugiohURL = process.env.YUGIOH_API;
    const APIUrl = `${yugiohURL}/cardsetsinfo.php?setcode=${cardNumber}`;
    const response = await axios.get(APIUrl);

    const data: any = response.data;

    const returnData: ApiResponse = {
      apiID: data.id,
      price: data.set_price,
    };

    return returnData;
  });

  return { apiID: 0, price: 0 };
};

const getCardsFromAPI = async (
  cardName: string
): Promise<APICard[] | string> => {
  try {
    const apiURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const response: any = await axios.get(`${apiURL}?fname=${cardName}`);

    const responseCards = response.data.data;

    const allCards: APICard[] = [];

    for (const card of responseCards) {
      if (card.card_sets) {
        const cardSet: Cardset[] = [];

        for (const set of card.card_sets) {
          const setInfo: Cardset = {
            setCode: set.set_code,
            setName: set.set_name,
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

const getCardFromAPI = async (
  cardName: string
): Promise<APIDetails | undefined> => {
  try {
    const apiURL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const response: any = await axios.get(`${apiURL}?name=${cardName}`);

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

const getAPIID = async (setName: string, cardName: string): Promise<number> => {
  const response: any = await axios.get(
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

export {
  convertFromStringToCsv,
  addNewCardsByCSV,
  addNewCards,
  addCard,
  getAllCards,
  getAllCardsByPartialName,
  getHomePageCards,
  getCardByCardID,
  addCardToInventory,
  getCardDataFromApi,
  getCardsFromAPI,
  getCardFromAPI,
  getAPIID,
};
