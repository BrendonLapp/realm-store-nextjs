import { useState } from 'react';
import SubmitButton from '../../../../shared/submit-button';

interface CardDetailsUpdateProps {
  price: number;
  imageID: number;
  cardID: number;
}

const CardDetailsUpdate = ({
  price,
  imageID,
  cardID,
}: CardDetailsUpdateProps) => {
  const [imageIDProp, setImageIDProp] = useState<number>(imageID);
  const [priceProp, setPriceProp] = useState<number>(price);

  const updateCard = (index: number) => {
    console.log(index);
  };

  const handlePriceChange = (event: any) => {
    if (Number.parseFloat(event.target.value) >= 0.0) {
      setPriceProp(Number.parseFloat(event.target.value));
    }
  };

  const handleImageIDChange = (event: any) => {
    if (event.target.value.toString().length === 8) {
      setImageIDProp(Number.parseInt(event.target.value));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Price</th>
            <th scope="col">Image ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ width: '35%' }}>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  defaultValue={priceProp}
                  onChange={handlePriceChange}
                />
              </div>
            </td>
            <td style={{ width: '35%' }}>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  defaultValue={imageIDProp}
                  onChange={handleImageIDChange}
                />
              </div>
            </td>
            <td>
              <SubmitButton
                name={'Save Changes'}
                submitAction={() => updateCard(cardID)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CardDetailsUpdate;
