import { useState } from 'react';
import { TabDisplay } from '../../../types/tab-display';
import Tabs from '../tab-nav/tabs';
import AddSealedProduct from './section/add-sealed-product';
import UpdateSealedProduct from './section/update-sealed-product';

const TabValues: TabDisplay[] = [
  {
    name: 'Add Sealed Product',
    Component: <AddSealedProduct />,
  },
  {
    name: 'Update Sealed Product Inventory',
    Component: <UpdateSealedProduct />,
  },
];

const SealedInventory = () => {
  const [tabs] = useState(TabValues);

  const [section, setSection] = useState(<AddSealedProduct />);

  return (
    <>
      <Tabs tabs={tabs} defaultTab={tabs[0].name} setSection={setSection} />
      {section}
    </>
  );
};

export default SealedInventory;
