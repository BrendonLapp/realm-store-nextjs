import InventoryRepository from '../repositories/inventory-repository';
import { Inventory } from '../types/inventory';

class InventoryController {
  public addToInventory = async (cardInventory: Inventory) => {
    const inventoryRepository = new InventoryRepository();

    inventoryRepository.insertInventory(cardInventory);
  };

  public updateInventory = async (
    cardID: number,
    qualityID: number,
    quantity: number
  ) => {
    const inventoryRepository = new InventoryRepository();

    const inventoryLevels = await inventoryRepository.getCardInventoryByQuality(
      cardID,
      qualityID
    );

    if (inventoryLevels) {
      const newQuantity = inventoryLevels[0].quantity + quantity;

      inventoryRepository.updateCardInventory(cardID, qualityID, newQuantity);
    }
  };
}

export default InventoryController;
