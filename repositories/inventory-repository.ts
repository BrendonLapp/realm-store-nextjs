import { connectToDB } from '../lib/mysql-connection';
import { Inventory } from '../types/inventory';

class InventoryRepository {
  public insertInventory = (cardInventory: Inventory) => {
    const connection = connectToDB();

    if (connection) {
      if (cardInventory) {
        const payload = {
          cardId: cardInventory.cardID,
          qualityId: cardInventory.qualityID,
          quantity: cardInventory.quantity,
          printing: cardInventory.printing,
          specialPrinting: cardInventory.specialPrinting,
        };

        const sqlQuery = 'INSERT INTO CardInventory SET ?';

        connection.query(sqlQuery, payload, function (error) {
          if (error) {
            console.error(error);
          }
          connection.end();
        });
      }
    }
  };

  public getCardInventoryByQuality = (
    cardID: number,
    qualityID: number
  ): Promise<Inventory[] | undefined> => {
    const connection = connectToDB();

    const sqlQuery =
      'SELECT cardInventoryID, cardID, qualityID, quantity FROM CardInventory WHERE cardID = ? AND qualityID = ?';

    return new Promise((resolve, reject) => {
      connection?.query(
        sqlQuery,
        [cardID, qualityID],
        function (error, result) {
          if (error) {
            reject(error);
          }
          const rows: Inventory[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        }
      );
    });
  };

  public getCardInventoryByCardID = (
    cardID: number
  ): Promise<Inventory[] | undefined> => {
    const connection = connectToDB();

    const sqlQuery =
      'SELECT cardInventoryID, cardID, qualityID, quantity FROM CardInventory WHERE cardID = ?';

    return new Promise((resolve, reject) => {
      connection?.query(sqlQuery, [cardID], function (error, result) {
        if (error) {
          reject(error);
        }
        const rows: Inventory[] = JSON.parse(JSON.stringify(result));
        connection.end();
        resolve(rows);
      });
    });
  };

  public updateCardInventory = (
    cardID: number,
    quality: number,
    quantity: number,
    printing: string,
    specialPrinting: string | null
  ) => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery =
        'UPDATE cardInventory SET quantity = ? WHERE cardID = ? AND qualityID = ? AND printing = ? AND specialPrinting = ?';

      connection.query(
        sqlQuery,
        [quantity, cardID, quality, printing, specialPrinting],
        function (error) {
          if (error) {
            console.error(error);
          }
          connection.end();
        }
      );
    }
  };
}

export default InventoryRepository;
