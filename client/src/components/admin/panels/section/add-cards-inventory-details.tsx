import { useState } from 'react';
import CardProvider from '../../../../providers/card-provider';
import { CardSet } from '../../../../types/api-details';
import { Card } from '../../../../types/card';
import SubmitButton from '../../../shared/submit-button';
import AddCardsInventoryRow from './add-cards-inventory-row';

interface AddCardsInventoryDetailsProps {
  cardDetails: CardSet[];
  name: string;
}

const AddCardsInventoryDetails = ({
  cardDetails,
  name,
}: AddCardsInventoryDetailsProps) => {
  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Set Code</th>
            <th scope="col">Rarity</th>
            <th scope="col" style={{ width: '10%' }}>
              Quantity
            </th>
            <th scope="col">Printing</th>
            <th scope="col">Condition</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cardDetails &&
            cardDetails?.map((card: CardSet, index: number) => (
              <AddCardsInventoryRow
                key={index}
                card={card}
                index={index}
                cardDetails={cardDetails}
                name={name}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AddCardsInventoryDetails;
