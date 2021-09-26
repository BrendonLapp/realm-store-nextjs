import { useEffect, useState } from 'react';
import { getAllCards } from '../../providers/card-provider';
import { Card } from '../../types/card';
import AddToCartButton from './add-to-cart-button';
import PriceBox from './price-box';
import ProductImage from './product-image';

const ProductDisplay = () => {
  const [cards, setCards] = useState<Card[]>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const retrieveAllCards = async () => {
      const allCards = await getAllCards();

      if (typeof allCards !== 'string') {
        setCards(allCards);
      } else {
        setErrorMessage(allCards);
      }

      setLoading(false);
    };

    if (loading) {
      retrieveAllCards();
    }
  }, [cards, loading]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (errorMessage !== '') {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {cards &&
          cards?.map((card: Card) => (
            <div key={card.cardID} className="col mb-5 productbox">
              <div className="card" style={{ backgroundColor: 'lightgray' }}>
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
                <AddToCartButton />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
