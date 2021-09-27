import { connectToDB } from '../lib/mysql-connection';
import { Inventory } from '../types/inventory';

class InventoryRepository {
  public insertInventory = (cardInventory: Inventory) => {
    const connection = connectToDB();

    if (cardInventory) {
      const payload = {
        cardId: cardInventory.cardID,
        qualityId: cardInventory.qualityID,
        quantity: cardInventory.quantity,
      };

      const sqlQuery = 'INSERT INTO CardInventory SET ?';

      connection.query(sqlQuery, payload, function (error) {
        if (error) {
          console.error(error);
        }
        connection.end();
      });
    }
  };
}

export default InventoryRepository;
