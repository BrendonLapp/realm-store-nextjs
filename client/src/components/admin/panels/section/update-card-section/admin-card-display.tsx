import { Card } from '../../../../../types/card';
import ProductImage from '../../../../store/product-image';
import AdminCardInfo from './admin-card-info';

interface AdminCardDisplayProps {
  displayCards: Card[];
  viewProduct: any;
}

const AdminCardDisplay = ({
  displayCards,
  viewProduct,
}: AdminCardDisplayProps) => {
  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {displayCards &&
          displayCards?.map((card: Card) => (
            <div key={card.cardID} className="col mb-5 productbox">
              <div
                className="card"
                style={{ backgroundColor: 'lightgray' }}
                onClick={() => viewProduct(card.cardID)}
              >
                <ProductImage
                  imageSource={card.image}
                  imageAlt={card.cardName}
                />
                <AdminCardInfo
                  name={card.cardName}
                  setName={card.setName}
                  cardNumber={card.cardNumber}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminCardDisplay;
