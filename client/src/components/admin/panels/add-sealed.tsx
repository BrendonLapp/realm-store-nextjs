import { useState } from 'react';
import Tabs from '../tab-nav/tabs';

const AddSealed = () => {
  const [tabs] = useState([
    'Add Sealed Product',
    'Update Sealed Product Inventory',
  ]);

  return (
    <>
      <Tabs tabs={tabs} defaultTab={tabs[0]} />
      <div>Sealed Product</div>
    </>
  );
};

export default AddSealed;
