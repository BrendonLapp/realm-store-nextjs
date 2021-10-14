import { CardSet } from '../../../../../types/api-details';
import UpdateCardsInventoryRow from './update-card-inventory-row';

interface UpdateCardsInventoryDetailsProps {
  cardDetails: CardSet[];
  name: string;
}

const UpdateCardsInventoryDetails = ({
  cardDetails,
  name,
}: UpdateCardsInventoryDetailsProps) => {
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
              <UpdateCardsInventoryRow
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

export default UpdateCardsInventoryDetails;
