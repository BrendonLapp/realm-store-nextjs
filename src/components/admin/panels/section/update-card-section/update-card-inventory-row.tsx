import axios from 'axios';
import { useState } from 'react';
import { Card, CardSet } from '../../../../../types/card';
import SubmitButton from '../../../../shared/submit-button';

interface UpdateCardsInventoryRowProps {
  card: CardSet;
  index: number;
  cardDetails: CardSet[];
  name: string;
}

const UpdateCardsInventoryRow = ({
  card,
  index,
  cardDetails,
  name,
}: UpdateCardsInventoryRowProps) => {
  const [quantity, setQuantity] = useState(0);
  const [condition, setCondition] = useState('select...');
  const [printing, setPrinting] = useState('select...');
  const [price, setPrice] = useState<number>(Number.parseFloat(card.setPrice));

  const AddToInventory = async (index: number) => {
    const apiID = await axios.get(
      '/api/admin/card-inventory/search-from-api/get-api-id',
      {
        data: {
          setName: cardDetails[index].setName,
          name: name,
        },
      }
    );

    if (printing !== 'select...' && condition !== 'select...') {
      const newCard: Card = {
        quantity: quantity,
        cardName: name,
        setName: cardDetails[index].setName,
        cardNumber: cardDetails[index].setCode,
        setCode: cardDetails[index].setCode,
        printing: printing,
        specialPrinting: null,
        condition: condition,
        rarity: cardDetails[index].setRarity,
        price: price,
        image: `https://storage.googleapis.com/ygoprodeck.com/pics/${apiID}.jpg`,
      };

      console.log('update still needs implementation', newCard);
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

export default UpdateCardsInventoryRow;
