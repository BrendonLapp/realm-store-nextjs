import InventoryRepository from '../repositories/inventory-repository';
import { Inventory } from '../types/inventory';

//Collection of inventory business logic
//TODO: Remove this being in a class
class InventoryController {
  public addToInventory = async (cardInventory: Inventory) => {
    const inventoryRepository = new InventoryRepository();

    inventoryRepository.insertInventory(cardInventory);
  };

  public updateInventory = async (
    cardID: number,
    qualityID: number,
    quantity: number,
    printing: string,
    specialPrinting: string | null
  ) => {
    const inventoryRepository = new InventoryRepository();

    const inventoryLevels = await inventoryRepository.getCardInventoryByQuality(
      cardID,
      qualityID
    );

    if (inventoryLevels && inventoryLevels[0]) {
      let newQuantity: number;
      if (inventoryLevels[0].quantity) {
        newQuantity = inventoryLevels[0].quantity + quantity;
      } else {
        newQuantity = quantity;
      }

      inventoryRepository.updateCardInventory(
        cardID,
        qualityID,
        newQuantity,
        printing,
        specialPrinting
      );
    } else {
      const newInventory: Inventory = {
        cardID: cardID,
        qualityID: qualityID,
        quantity: quantity,
        printing: printing,
        specialPrinting: specialPrinting,
      };
      await this.addToInventory(newInventory);
    }
  };

  public getInventoryByCardID = async (cardID: number) => {
    const inventoryRepository = new InventoryRepository();

    const inventoryLevels = await inventoryRepository.getCardInventoryByCardID(
      cardID
    );

    console.log(inventoryLevels);
  };
}

export default InventoryController;
