import CardRepository from '../repositories/card-repository';
import { Card } from '../types/card';

const checkIfCardExists = async (
  cardNumber: string
): Promise<Card[] | undefined> => {
  const cardRepository = new CardRepository();
  const card = await cardRepository.getCard(cardNumber);

  if (card.length !== 0) {
    return card;
  }

  return undefined;
};

export { checkIfCardExists };
