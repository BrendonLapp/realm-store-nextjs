import { APICard } from '../../../../../types/card';
import ProductImage from '../../../../store/product-image';
import InventoryInfo from '../../section-components/inventory-info';

interface AddCardsPanelProps {
  cards: APICard[];
  viewProduct: any;
}

const AddCardsPanel = ({ cards, viewProduct }: AddCardsPanelProps) => {
  return (
    <div className="container px-4 px-lg-5 mt-5">
      <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
        {cards &&
          cards?.map((card: APICard) => (
            <div key={card.name} className="col mb-5 productbox">
              <div
                className="card"
                style={{ backgroundColor: 'lightgray' }}
                onClick={() => viewProduct(card.name)}
              >
                <ProductImage imageSource={card.image} imageAlt={card.name} />
                <InventoryInfo name={card.name} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddCardsPanel;
