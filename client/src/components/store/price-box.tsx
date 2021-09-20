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
        <h5 className="fw-bolder">{name}</h5>${price}
        <p style={{ fontSize: '1rem' }}>{setName}</p>
        <p style={{ fontSize: '1rem' }}>{cardNumber}</p>
        <p style={{ fontSize: '1rem' }}>In stock: {quantity}</p>
      </div>
    </div>
  );
};

export default PriceBox;
