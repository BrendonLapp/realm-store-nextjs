import axios from 'axios';
import CardRepository from '../repositories/card-repository';
import { ApiResponse, Card } from '../types/card';
import { Inventory } from '../types/inventory';
import InventoryController from './inventory-controller';

class CardController {
  public addNewCards = async (req: any, res: any) => {
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
        card.cardID = cardRepository.insertCard(card);
        this.updateInventoryWithCard(card);
      } catch (error) {
        console.error(error);
      }
    }

    res.sendStatus(200);
  };

  private updateInventoryWithCard = (card: Card) => {
    const inventoryController = new InventoryController();

    const qualityID = this.pickQuality(card.condition);

    const inventoryValues: Inventory = {
      cardID: card.cardID,
      qualityID: qualityID,
      quantity: card.quantity,
    };

    inventoryController.addToInventory(inventoryValues);
  };

  private pickQuality = (qualityName: string): number => {
    switch (qualityName) {
      case 'Near Mint':
        return 1;
      case 'Lightly Played':
        return 2;
      case 'Moderately Played':
        return 3;
      case 'Heavily Played':
        return 4;
    }
  };

  private getCardDataFromApi = async (
    cardNumber: string
  ): Promise<ApiResponse> => {
    if (!cardNumber || cardNumber.includes('LART')) {
      return { apiID: 0, price: 0 };
    }

    try {
      const APIUrl = `https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=${cardNumber}`;
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
