import { Card } from '../types/card';

class CardRepository {
  public insertCard = (card: Card) => {
    console.log(card);
  };
}

export default CardRepository;
