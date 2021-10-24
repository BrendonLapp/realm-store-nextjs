interface InventoryInfoProps {
  name: string;
}

const InventoryInfo = ({ name }: InventoryInfoProps) => {
  return (
    <div className="card-body">
      <div className="text-center" style={{ color: 'black' }}>
        <h5 className="bold">{name}</h5>
      </div>
    </div>
  );
};

export default InventoryInfo;
