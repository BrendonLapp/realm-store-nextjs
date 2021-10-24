import { Card } from '../../types/card';
import AddToCartButton from './add-to-cart-button';
import PriceBox from './price-box';
import ProductImage from './product-image';

interface ProductDisplayProps {
  cardsData: Card[];
}

const ProductDisplay = ({ cardsData }: ProductDisplayProps) => {
  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {cardsData &&
          cardsData?.map((card: Card) => (
            <div key={card.cardID} className="col mb-5 productbox">
              <div className="card" style={{ backgroundColor: 'lightgray' }}>
                {card.image && card.price && (
                  <>
                    <ProductImage
                      imageSource={card.image}
                      imageAlt={card.cardName}
                    />
                    <PriceBox
                      name={card.cardName}
                      price={card.price}
                      quantity={card.quantity}
                      setName={card.setName}
                      cardNumber={card.cardNumber}
                    />
                  </>
                )}
                <AddToCartButton />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
