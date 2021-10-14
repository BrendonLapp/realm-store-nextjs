import InStockDisplay from '../../../../store/in-stock-display';

interface AdminCardInfoProps {
  name: string;
  quantity: number;
  setName: string;
  cardNumber: string;
}

const AdminCardInfo = ({
  name,
  quantity,
  setName,
  cardNumber,
}: AdminCardInfoProps) => {
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
        <InStockDisplay quantity={quantity} />
      </div>
    </div>
  );
};

export default AdminCardInfo;
