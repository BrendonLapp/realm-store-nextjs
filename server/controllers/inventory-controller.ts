import { connectToDB } from '../lib/mysql-connection';
import { Inventory } from '../types/inventory';

class InventoryController {
  public addToInventory = (cardInventory: Inventory) => {
    const connection = connectToDB();

    if (cardInventory) {
      const payload = {
        cardId: cardInventory.cardID,
        qualityId: cardInventory.qualityID,
        quantity: cardInventory.quantity,
      };

      const sqlQuery = 'INSERT INTO CardInventory SET ?';

      connection.query(sqlQuery, payload, function (error, result) {
        if (error) {
          console.error(error);
        }
        console.log('Card Added' + cardInventory.cardID);
      });
    }
  };
}

export default InventoryController;
