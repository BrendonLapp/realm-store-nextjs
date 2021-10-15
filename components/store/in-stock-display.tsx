interface InStockProps {
  quantity: number;
}

const InStockDisplay = ({ quantity }: InStockProps) => {
  if (quantity === 0 || quantity === undefined) {
    return (
      <p className="margin-bottom-0 red-text" style={{ fontSize: '1rem' }}>
        In stock: 0
      </p>
    );
  }

  return (
    <p className="margin-bottom-0 green-text" style={{ fontSize: '1rem' }}>
      In stock: {quantity}
    </p>
  );
};

export default InStockDisplay;
