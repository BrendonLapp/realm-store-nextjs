import { useEffect, useState } from 'react';
import CardProvider from '../../../../providers/card-provider';
import { APIDetails } from '../../../../types/api-details';
import ProductImage from '../../../store/product-image';
import AddCardsInventoryDetails from './add-cards-inventory-details';

interface AddCardInventoryPanelProps {
  cardName: string;
}

const AddCardInventoryPanel = ({ cardName }: AddCardInventoryPanelProps) => {
  const [cardData, setCardData] = useState<APIDetails>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardData = async (cardName: string) => {
      const cardProvider = new CardProvider();
      const apiData = await cardProvider.getCardFromAPI(cardName);

      setCardData(apiData);
      setLoading(false);
    };

    if (loading) {
      getCardData(cardName);
    }
  }, [cardData, loading, cardName]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <AddCardsInventoryDetails cardDetails={cardData.cardSets} />
          </div>
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default AddCardInventoryPanel;
