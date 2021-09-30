import { CardSet } from '../../../../types/api-details';
import SubmitButton from '../../../shared/submit-button';

interface AddCardsInventoryDetailsProps {
  cardDetails: CardSet[];
}

const AddCardsInventoryDetails = ({
  cardDetails,
}: AddCardsInventoryDetailsProps) => {
  const AddToInventory = () => {
    console.log('added');
  };

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Set Code</th>
            <th scope="col">Rarity</th>
            <th scope="col">Quantity</th>
            <th scope="col">Quality</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cardDetails &&
            cardDetails?.map((card: CardSet) => (
              <tr key={card.setCode}>
                <td>{card.setCode}</td>
                <td>{card.setRarity}</td>
                <td>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0"
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <select className="form-control">
                      <option>Near Mint</option>
                      <option>Lightly Played</option>
                      <option>Moderately Played</option>
                      <option>Heavily Played</option>
                    </select>
                  </div>
                </td>
                <td>
                  <SubmitButton name={'add'} submitAction={AddToInventory} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AddCardsInventoryDetails;
