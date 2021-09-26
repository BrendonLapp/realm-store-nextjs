import axios from 'axios';
import { Request, Response } from 'express';
import pickQuality from '../lib/pick-quality';
import CardRepository from '../repositories/card-repository';
import { ApiResponse, Card } from '../types/card';
import { Inventory } from '../types/inventory';
import InventoryController from './inventory-controller';

class CardController {
  public addNewCards = async (req: Request, res: Response) => {
    const cardRepository = new CardRepository();

    for (const card of req.body.data) {
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
          this.updateInventoryWithCard(card);
        }
      } catch (error) {
        console.error(error);
      }
    }

    res.sendStatus(200);
  };

  public getAllCards = async (req: Request, res: Response) => {
    const cardRepository = new CardRepository();

    const allCards = await cardRepository.getCards();

    res.send(allCards);
  };

  private updateInventoryWithCard = (card: Card) => {
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
