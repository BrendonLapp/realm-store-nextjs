import { useState } from 'react';
import CardProvider from '../../../../../providers/card-provider';
import { CardSet } from '../../../../../types/api-details';
import { Card } from '../../../../../types/card';
import SubmitButton from '../../../../shared/submit-button';

interface AddCardsInventoryRowProps {
  card: CardSet;
  index: number;
  cardDetails: CardSet[];
  name: string;
}

const AddCardsInventoryRow = ({
  card,
  index,
  cardDetails,
  name,
}: AddCardsInventoryRowProps) => {
  const [quantity, setQuantity] = useState(0);
  const [condition, setCondition] = useState('select...');
  const [printing, setPrinting] = useState('select...');
  const [price, setPrice] = useState<number>(Number.parseFloat(card.setPrice));

  const AddToInventory = async (index: number) => {
    const cardProvider = new CardProvider();

    const apiID = await cardProvider.getAPIID(cardDetails[index].setName, name);

    if (printing !== 'select...' && condition !== 'select...') {
      const newCard: Card = {
        quantity: quantity,
        cardName: name,
        setName: cardDetails[index].setName,
        cardNumber: cardDetails[index].setCode,
        setCode: cardDetails[index].setCode,
        printing: printing,
        condition: condition,
        rarity: cardDetails[index].setRarity,
        price: price,
        image: `https://storage.googleapis.com/ygoprodeck.com/pics/${apiID}.jpg`,
      };

      cardProvider.addNewCard(newCard);
    }
  };

  const handleConditionChange = (event: any) => {
    setCondition(event.target.value);
  };

  const handleQuantityChange = (event: any) => {
    setQuantity(Number.parseInt(event.target.value));
  };

  const handlePriceChange = (event: any) => {
    setPrice(Number.parseFloat(event.target.value));
  };

  const handlePrintingChange = (event: any) => {
    setPrinting(event.target.value);
  };

  return (
    <tr>
      <td>{card.setCode}</td>
      <td>{card.setRarity}</td>
      <td style={{ width: '10%' }}>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="0"
            onChange={(event) => handleQuantityChange(event)}
          />
        </div>
      </td>
      <td>
        <div className="form-group">
          <select
            className="form-control"
            onChange={(event) => handlePrintingChange(event)}
          >
            <option value="">select...</option>
            <option value="1st Edition">1st Edition</option>
            <option value="Unlimited">Unlimited</option>
          </select>
        </div>
      </td>
      <td>
        <div className="form-group">
          <select
            className="form-control"
            onChange={(event) => handleConditionChange(event)}
          >
            <option value="">select...</option>
            <option value="Near Mint">Near Mint</option>
            <option value="Lightly Played">Lightly Played</option>
            <option value="Moderately Played">Moderately Played</option>
            <option value="Heavily Played">Heavily Played</option>
          </select>
        </div>
      </td>
      <td style={{ width: '15%' }}>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            defaultValue={card.setPrice}
            onChange={(event) => handlePriceChange(event)}
          />
        </div>
      </td>
      <td>
        <SubmitButton name={'add'} submitAction={() => AddToInventory(index)} />
      </td>
    </tr>
  );
};

export default AddCardsInventoryRow;
