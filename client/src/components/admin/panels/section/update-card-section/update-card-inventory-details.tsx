import { useState } from 'react';
import { Card } from '../../../../../types/card';
import SubmitButton from '../../../../shared/submit-button';
import UpdateCardsInventoryRow from './update-card-inventory-row';

interface UpdateCardsInventoryDetailsProps {
  card: Card[];
  name: string;
}

const UpdateCardsInventoryDetails = ({}) => {
  const [quantity, setQuantity] = useState(0);
  const [cardID, setCardID] = useState(282);

  const updateCard = (qualityID: number) => {
    console.log(cardID, qualityID);
  };

  const handleQuantityChange = (event: any) => {
    if (Number.parseInt(event.target.value) >= 0) {
      setQuantity(Number.parseInt(event.target.value));
    }
  };

  return (
    <>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Printing</th>
            <th scope="col">Condition</th>
            <th scope="col" style={{ width: '10%' }}>
              Quantity
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st Edition</td>
            <td>Near Mint</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>1st Edition</td>
            <td>Lightly Played</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>1st Edition</td>
            <td>Moderately Played</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>1st Edition</td>
            <td>Heavily Played</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Unlimited</td>
            <td>Near Mint</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Unlimited</td>
            <td>Lightly Played</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Unlimited</td>
            <td>Moderately Played</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>Unlimited</td>
            <td>Heavily Played</td>
            <td>
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
              <div>
                <SubmitButton
                  name={'Save Changes'}
                  submitAction={() => updateCard(4)}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UpdateCardsInventoryDetails;
