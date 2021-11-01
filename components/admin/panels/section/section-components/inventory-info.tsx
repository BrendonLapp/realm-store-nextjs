interface InventoryInfoProps {
  name: string;
}

const InventoryInfo = ({ name }: InventoryInfoProps) => {
  return (
    <div className="card-body" style={{ padding: '0, 0' }}>
      <div className="text-center" style={{ color: 'black' }}>
        <h5 className="bold card-title-sizing">{name}</h5>
      </div>
    </div>
  );
};

export default InventoryInfo;
