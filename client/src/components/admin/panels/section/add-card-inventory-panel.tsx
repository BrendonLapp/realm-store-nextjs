import { useEffect, useState } from 'react';
import CardProvider from '../../../../providers/card-provider';
import { APIDetails } from '../../../../types/api-details';
import ProductImage from '../../../store/product-image';

interface AddCardInventoryPanelProps {
  cardName: string;
}

const AddCardInventoryPanel = ({ cardName }: AddCardInventoryPanelProps) => {
  const [cardData, setCardData] = useState<APIDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCardData = async (cardName: string) => {
      const cardProvider = new CardProvider();
      const apiData = await cardProvider.getCardFromAPI(cardName);

      console.log(apiData);
      //   setCardData();

      setLoading(false);
    };

    if (loading) {
      getCardData(cardName);
    }
  }, [cardData, loading]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          {/* <ProductImage imageSource={} imageAlt={} /> */}
        </div>
        <div className="col-sm">One of two columns</div>
      </div>
    </div>
  );
};

export default AddCardInventoryPanel;
