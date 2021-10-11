import axios from 'axios';
import { Request, Response } from 'express';
import { checkIfCardExists } from '../lib/check-if-card-exists';
import ConvertPriceToCanadian from '../lib/convert-price-to-canadian';
import pickQuality from '../lib/pick-quality';
import CardRepository from '../repositories/card-repository';
import { ApiResponse, Card } from '../types/card';
import { Inventory } from '../types/inventory';
import InventoryController from './inventory-controller';

class CardController {
  public addNewCards = async (req: Request, res: Response) => {
    const inventoryController = new InventoryController();
    for (const card of req.body.data) {
      const existingCard = await checkIfCardExists(card.cardNumber);

      const qualityID = pickQuality(card.condition);

      if (!existingCard) {
        this.addCard(card);
      } else {
        await inventoryController.updateInventory(
          existingCard[0].cardID,
          qualityID,
          card.quantity
        );
      }

      res.sendStatus(200);
    }
  };

  public addCard = async (card: Card) => {
    const cardRepository = new CardRepository();
    const apiResponse: ApiResponse = await this.getCardDataFromApi(
      card.cardNumber
    );

    card.apiID = apiResponse.apiID;
    card.price = apiResponse.price;
    card.image = `https://storage.googleapis.com/ygoprodeck.com/pics/${apiResponse.apiID}.jpg`;

    if (!card.price) {
      card.price = 0;
    }

    try {
      if (card.apiID) {
        const cardID = await cardRepository.insertCard(card);
        card.cardID = cardID;
        this.addCardToInventory(card);
      }
    } catch (error) {
      console.error(error);
    }
  };

  public getAllCards = async (req: Request, res: Response) => {
    const cardRepository = new CardRepository();

    const allCards = await cardRepository.getCards();

    res.send(allCards);
  };

  private addCardToInventory = (card: Card) => {
    const inventoryController = new InventoryController();

    const qualityID = pickQuality(card.condition);

    const inventoryValues: Inventory = {
      cardID: card.cardID,
      qualityID: qualityID,
      quantity: card.quantity,
    };

    inventoryController.addToInventory(inventoryValues);
  };

  private getCardDataFromApi = async (
    cardNumber: string
  ): Promise<ApiResponse> => {
    if (!cardNumber || cardNumber.includes('LART')) {
      return { apiID: 0, price: 0 };
    }

    try {
      const yugiohURL = process.env.YUGIOH_API;
      const APIUrl = `${yugiohURL}/cardsetsinfo.php?setcode=${cardNumber}`;
      const response = await axios.get(APIUrl);

      const returnData: ApiResponse = {
        apiID: response.data.id,
        price: response.data.set_price,
      };

      return returnData;
    } catch (error) {
      console.error(error);
    }
  };
}

export default CardController;
