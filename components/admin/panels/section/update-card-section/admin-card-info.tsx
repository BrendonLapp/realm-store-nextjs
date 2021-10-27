interface AdminCardInfoProps {
  name: string;
  setName: string;
  cardNumber: string;
}

const AdminCardInfo = ({ name, setName, cardNumber }: AdminCardInfoProps) => {
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
      </div>
    </div>
  );
};

export default AdminCardInfo;
