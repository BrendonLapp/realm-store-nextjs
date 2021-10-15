import { connectToDB } from '../lib/mysql-connection';
import { Card } from '../types/card';

class CardRepository {
  public insertCard = async (card: Card): Promise<number> => {
    const connection = connectToDB();

    if (!card.cardName) {
      return 0;
    }

    const payload = {
      apiId: card.apiID,
      cardName: card.cardName,
      setName: card.setName,
      cardNumber: card.cardNumber,
      printing: card.printing,
      rarity: card.rarity,
      price: card.price,
      image: card.image,
    };

    const sqlQuery = 'INSERT INTO Card SET ?';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, payload, function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result.insertId);
        connection.end();
      });
    });
  };

  public getCards = async (): Promise<Card[]> => {
    const connection = connectToDB();

    const sqlQuery =
      'SELECT Card.cardID, apiID, cardName, setName, cardNumber, printing, rarity, price, image, quantity, qualityName, percentageOff FROM Card INNER JOIN CardInventory ON Card.CardID = CardInventory.CardID INNER JOIN Quality ON CardInventory.QualityID = Quality.qualityID WHERE CardInventory.QualityID = 1';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, function (error, result) {
        if (error) {
          reject(error);
        }
        const rows: Card[] = JSON.parse(JSON.stringify(result));
        connection.end();
        resolve(rows);
      });
    });
  };

  public getCardsByPartialName = async (
    partialName: string
  ): Promise<Card[]> => {
    const connection = connectToDB();

    const sqlQuery = `SELECT cardID, apiID, cardName, setName, cardNumber, printing, rarity, price, image FROM Card WHERE CardName LIKE '%${partialName}%'`;

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, function (error, result) {
        if (error) {
          reject(error);
        }
        const rows: Card[] = JSON.parse(JSON.stringify(result));
        connection.end();
        resolve(rows);
      });
    });
  };

  public getCard = async (cardNumber: string): Promise<Card[]> => {
    const connection = connectToDB();

    const sqlQuery =
      'SELECT Card.cardID, cardNumber FROM Card WHERE cardNumber=?';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [cardNumber], function (error, result) {
        if (error) {
          reject(error);
        }
        const rows: Card[] = JSON.parse(JSON.stringify(result));
        connection.end();
        resolve(rows);
      });
    });
  };

  public getCardsByCardID = async (cardID: number): Promise<Card> => {
    const connection = connectToDB();

    const sqlQuery =
      'SELECT Card.cardID, apiID, cardNumber, printing, rarity, price, image FROM Card WHERE CardID=?';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [cardID], function (error, result) {
        if (error) {
          reject(error);
        }
        const rows: Card = JSON.parse(JSON.stringify(result));
        connection.end();
        resolve(rows);
      });
    });
  };
}

export default CardRepository;
