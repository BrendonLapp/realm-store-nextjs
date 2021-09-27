import { connectToDB } from '../lib/mysql-connection';
import InventoryRepository from '../repositories/inventory-repository';
import { Inventory } from '../types/inventory';

class InventoryController {
  public addToInventory = (cardInventory: Inventory) => {
    const inventoryRepository = new InventoryRepository();

    inventoryRepository.insertInventory(cardInventory);
  };
}

export default InventoryController;
