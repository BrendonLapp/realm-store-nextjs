import CardRepository from '../repositories/card-repository';

const checkIfCardExists = async (cardNumber: string): Promise<boolean> => {
  const cardRepository = new CardRepository();

  const card = await cardRepository.getCard(cardNumber);

  console.log(card);

  return false;
};

export { checkIfCardExists };
