import { useState } from 'react';
import Tabs from '../tab-nav/tabs';

const AddCards = () => {
  const [tabs] = useState([
    'Add By CSV',
    'Add By Card Name',
    'Update Card Inventory',
  ]);

  return (
    <>
      <Tabs tabs={tabs} defaultTab={tabs[0]} />
      <div>Add Cards</div>
    </>
  );
};

export default AddCards;
