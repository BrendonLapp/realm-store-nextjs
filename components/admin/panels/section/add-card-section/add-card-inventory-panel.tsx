import axios from 'axios';
import { useEffect, useState } from 'react';
import { APIDetails } from '../../../../../types/card';
import ProductImage from '../../../../store/product-image';
import AddCardsInventoryDetails from './add-cards-inventory-details';

interface AddCardInventoryPanelProps {
  cardName: string;
}

const AddCardInventoryPanel = ({ cardName }: AddCardInventoryPanelProps) => {
  const [cardData, setCardData] = useState<APIDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardData = async (cardName: string) => {
      const apiData: any = await axios.get(
        `/api/admin/card-inventory/search-from-api/by-full-name/${cardName}`
      );

      setCardData(apiData.data);
      setLoading(false);
    };

    if (loading) {
      getCardData(cardName);
    }
  }, [cardData, loading, cardName]);

  if (cardData) {
    return (
      <div className="container">
        <div className="row">
          <div style={{ width: '20%' }}>
            <ProductImage
              imageSource={cardData?.cardImages[0].imageUrl}
              imageAlt={cardData?.name}
            />
          </div>
          <div style={{ width: '80%' }}>
            <AddCardsInventoryDetails
              cardDetails={cardData.cardSets}
              name={cardData.name}
            />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default AddCardInventoryPanel;
