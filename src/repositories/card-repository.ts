import { connectToDB } from '../lib/mysql-connection';
import { Card } from '../types/card';

class CardRepository {
  public insertCard = async (card: Card): Promise<number> => {
    const connection = connectToDB();

    if (connection) {
      if (!card.cardName) {
        return 0;
      }

      const payload = {
        apiId: card.apiID,
        cardName: card.cardName,
        setName: card.setName,
        cardNumber: card.cardNumber,
        rarity: card.rarity,
        price: card.price,
        manualPricing: card.manualSetPrice,
        image: card.image,
      };

      const sqlQuery = `INSERT INTO Card SET ?`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, payload, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          console.log(result);
          resolve(result.insertId);
          connection.end();
        });
      });
    }
    return 0;
  };

  public updateCard = async (
    cardID: number,
    price: number,
    apiID: number,
    imageURL: string
  ): Promise<number> => {
    const connection = connectToDB();

    if (connection) {
      if (!cardID && !price && !apiID) {
        return 0;
      }

      //TODO: When i revisit update, this will need the manual set price here
      //probably also a way to clear the manual price
      const sqlQuery = `UPDATE Card SET apiID = ?, price = ?, image = ? WHERE CardID = ?`;

      return new Promise((resolve, reject) => {
        connection.query(
          sqlQuery,
          [apiID, price, imageURL, cardID],
          function (error: any, result: any) {
            if (error) {
              reject(error);
            }
            resolve(result.insertId);
            connection.end();
          }
        );
      });
    }
    return 0;
  };

  public getCards = async (): Promise<Card[] | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `SELECT Card.cardID, apiID, cardName, setName, cardNumber, cardInventory.printing, cardInventory.specialPrinting, 
        rarity, price, image, sum(quantity) 
        FROM Card 
        INNER JOIN CardInventory ON Card.CardID = CardInventory.CardID 
        INNER JOIN Quality ON CardInventory.QualityID = Quality.qualityID 
        WHERE CardInventory.QualityID = 1`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          const rows: Card[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        });
      });
    }
    return undefined;
  };

  public getCardsByPartialName = async (
    partialName: string
  ): Promise<Card[] | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `SELECT cardID, apiID, cardName, setName, cardNumber, rarity, price, image FROM Card WHERE CardName LIKE '%${partialName}%'`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          const rows: Card[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        });
      });
    }
    return undefined;
  };

  public getCard = async (cardNumber: string): Promise<Card[] | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `SELECT Card.cardID, cardNumber FROM Card WHERE cardNumber=?`;

      return new Promise((resolve, reject) => {
        connection.query(
          sqlQuery,
          [cardNumber],
          function (error: any, result: any) {
            if (error) {
              reject(error);
            }
            const rows: Card[] = JSON.parse(JSON.stringify(result));
            connection.end();
            resolve(rows);
          }
        );
      });
    }
    return undefined;
  };

  public getCardsByCardID = async (
    cardID: number
  ): Promise<Card | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `SELECT Card.cardID, apiID, cardNumber, rarity, price, image FROM Card WHERE CardID=?`;

      return new Promise((resolve, reject) => {
        connection.query(
          sqlQuery,
          [cardID],
          function (error: any, result: any) {
            if (error) {
              reject(error);
            }
            const rows: Card = JSON.parse(JSON.stringify(result));
            connection.end();
            resolve(rows);
          }
        );
      });
    }
    return undefined;
  };

  public getHomePageCards = async (): Promise<Card[] | undefined> => {
    const connection = connectToDB();

    if (connection) {
      const sqlQuery = `SELECT Card.cardID, apiID, cardName, setName, cardNumber, cardInventory.printing, cardInventory.specialPrinting, 
        rarity, price, image, sum(quantity) 
        FROM Card 
        INNER JOIN CardInventory ON Card.CardID = CardInventory.CardID 
        INNER JOIN Quality ON CardInventory.QualityID = Quality.qualityID 
        WHERE CardInventory.QualityID = 1 
        ORDER BY RAND() 
        LIMIT 8`;

      return new Promise((resolve, reject) => {
        connection.query(sqlQuery, function (error: any, result: any) {
          if (error) {
            reject(error);
          }
          const rows: Card[] = JSON.parse(JSON.stringify(result));
          connection.end();
          resolve(rows);
        });
      });
    }
    return undefined;
  };
}

export default CardRepository;
