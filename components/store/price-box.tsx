import InStockDisplay from './in-stock-display';

interface PriceBoxProps {
  name: string;
  price: number;
  quantity: number;
  setName: string;
  cardNumber: string;
}

const PriceBox = ({
  name,
  price,
  quantity,
  setName,
  cardNumber,
}: PriceBoxProps) => {
  return (
    <div className="card-body">
      <div className="text-center" style={{ color: 'black' }}>
        <h5 className="bold">{name}</h5>
        <p className="margin-bottom-0" style={{ fontSize: '1rem' }}>
          {setName}
        </p>
        <p className="margin-bottom-0" style={{ fontSize: '1rem' }}>
          {cardNumber}
        </p>
        <p className="margin-bottom-0 bold" style={{ fontSize: '1rem' }}>
          ${price}
        </p>
        <InStockDisplay quantity={quantity} />
      </div>
    </div>
  );
};

export default PriceBox;
