import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from '../../../../../types/card';
import ProductImage from '../../../../store/product-image';
import CardDetailsUpdate from './card-details-update';
import UpdateCardsInventoryDetails from './update-card-inventory-details';

interface UpdateCardInventoryPanelProps {
  cardID: number;
}

const UpdateCardInventoryPanel = ({
  cardID,
}: UpdateCardInventoryPanelProps) => {
  const [cardData, setCardData] = useState<Card>();
  const [loading, setLoading] = useState(true);
  const [imageID, setImageID] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const getCardData = async (cardID: number) => {
      const responseData: any = await axios.get(
        `/api/general/search/search-by-id/${cardID}`
      );

      if (typeof responseData !== 'string') {
        setCardData(responseData);
        if (responseData.apiID && responseData.price) {
          setImageID(responseData.apiID);
          setPrice(responseData.price);
        }
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
          <div style={{ width: '80%' }}>
            <CardDetailsUpdate
              cardID={cardID}
              imageID={imageID}
              price={price}
            />
            <UpdateCardsInventoryDetails />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default UpdateCardInventoryPanel;
