import { resolve } from 'path/posix';
import { connectToDB } from '../lib/mysql-connection';
import { Card } from '../types/card';

class CardRepository {
  public insertCard = async (card: Card): Promise<number> => {
    const connection = connectToDB();

    if (!card.name) {
      return 0;
    }

    const payload = {
      apiId: card.apiID,
      cardName: card.name,
      setName: card.set,
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
      'SELECT cardID, apiID, cardName, setName, cardNumber, printing, rarity, price, image FROM Card';

    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, function (error, result) {
        if (error) {
          reject(error);
        }
        const rows: any = JSON.parse(JSON.stringify(result));
        connection.end();
        resolve(rows);
      });
    });
  };
}

export default CardRepository;
