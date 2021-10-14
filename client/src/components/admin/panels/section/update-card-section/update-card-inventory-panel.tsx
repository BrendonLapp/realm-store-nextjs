import { useEffect, useState } from 'react';
import CardProvider from '../../../../../providers/card-provider';
import { APIDetails } from '../../../../../types/api-details';
import { Card } from '../../../../../types/card';
import ProductImage from '../../../../store/product-image';
import UpdateCardsInventoryDetails from './update-card-inventory-details';

interface UpdateCardInventoryPanelProps {
  cardID: number;
}

const UpdateCardInventoryPanel = ({
  cardID,
}: UpdateCardInventoryPanelProps) => {
  const [cardData, setCardData] = useState<Card>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardData = async (cardID: number) => {
      const cardProvider = new CardProvider();
      const responseData = await cardProvider.getCardByID(cardID);

      if (typeof responseData !== 'string') {
        console.log('effect', responseData);
        setCardData(responseData);
      }
      setLoading(false);
    };

    if (loading) {
      getCardData(cardID);
    }
  }, [cardData, loading, cardID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (typeof cardData !== 'string' && cardData) {
    return (
      <div className="container">
        <div className="row">
          <div style={{ width: '20%' }}>
            <ProductImage
              imageSource={cardData.image}
              imageAlt={cardData.cardName}
            />
          </div>
          {/* <div style={{ width: '80%' }}>
            <UpdateCardsInventoryDetails
              cardDetails={cardData}
              name={cardData.name}
            />
          </div> */}
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default UpdateCardInventoryPanel;
