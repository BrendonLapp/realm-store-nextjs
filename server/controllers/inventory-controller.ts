import { Inventory } from '../types/inventory';

class InventoryController {
  public addToInventory = (cardInventory: Inventory) => {
    console.log(cardInventory);
  };
}

export default InventoryController;
