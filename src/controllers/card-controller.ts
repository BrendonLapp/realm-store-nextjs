import axios from 'axios';
import Papa from 'papaparse';
import { checkIfCardExists } from '../lib/check-if-card-exists';
import pickQuality from '../lib/pick-quality';
import CardRepository from '../repositories/card-repository';
import InventoryRepository from '../repositories/inventory-repository';
import { ApiResponse, Card } from '../types/card';
import { Inventory } from '../types/inventory';
import InventoryController from './inventory-controller';

class CardController {
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

  public addNewCardsByCSV = async (csvData: string) => {
    const cardsData = await this.convertFromStringToCsv(csvData);

    if (!cardsData) {
      throw new Error('There was an error when trying to add the cards.');
    }

    if (cardsData.length !== 0) {
      this.addNewCards(cardsData);
    }
  };

  public addNewCards = async (cardsData: Card[]) => {
    const inventoryController = new InventoryController();
    for (const card of cardsData) {
      const existingCard = await checkIfCardExists(card.cardNumber);

      const qualityID = pickQuality(card.condition);

      if (!existingCard) {
        this.addCard(card);
      } else {
        if (existingCard[0].cardID && qualityID) {
          await inventoryController.updateInventory(
            existingCard[0].cardID,
            qualityID,
            card.quantity
          );
        }
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

  public addCard = async (card: Card) => {
    const cardRepository = new CardRepository();
    try {
      const apiResponse: ApiResponse = await this.getCardDataFromApi(
        card.cardNumber
      );

      card.apiID = apiResponse.apiID;
      card.price = apiResponse.price;
      card.image = `https://storage.googleapis.com/ygoprodeck.com/pics/${apiResponse.apiID}.jpg`;

      if (!card.price) {
        card.price = 0;
      }

      if (card.apiID) {
        const cardID = await cardRepository.insertCard(card);
        card.cardID = cardID;
        this.addCardToInventory(card);
      }
    } catch (error) {
      console.error(error);
    }
  };

  public getAllCards = async (): Promise<Card[] | undefined> => {
    const cardRepository = new CardRepository();

    const allCards = await cardRepository.getCards();

    if (allCards) {
      return allCards;
    }
    return undefined;
  };

  public getAllCardsByPartialName = async (
    partialName: string
  ): Promise<Card[] | undefined> => {
    const cardRepository = new CardRepository();

    const allCards = await cardRepository.getCardsByPartialName(partialName);

    return allCards;
  };

  public getCardByCardID = async (
    cardID: number
  ): Promise<Card | undefined> => {
    const cardRepository = new CardRepository();
    const inventoryRepository = new InventoryRepository();

    const allCards = await cardRepository.getCardsByCardID(cardID);

    const inventoryLevels = await inventoryRepository.getCardInventoryByCardID(
      cardID
    );

    return allCards;
  };

  private addCardToInventory = (card: Card) => {
    const inventoryController = new InventoryController();

    const qualityID = pickQuality(card.condition);

    if (card.cardID && qualityID) {
      const inventoryValues: Inventory = {
        cardID: card.cardID,
        qualityID: qualityID,
        quantity: card.quantity,
      };

      inventoryController.addToInventory(inventoryValues);
    }
  };

  private getCardDataFromApi = async (
    cardNumber: string
  ): Promise<ApiResponse> => {
    if (!cardNumber || cardNumber.includes('LART')) {
      return { apiID: 0, price: 0 };
    }

    const yugiohURL = process.env.YUGIOH_API;
    const APIUrl = `${yugiohURL}/cardsetsinfo.php?setcode=${cardNumber}`;
    const response = await axios.get(APIUrl);

    const data: any = response.data;

    const returnData: ApiResponse = {
      apiID: data.id,
      price: data.set_price,
    };

    return returnData;
  };
}

export default CardController;
