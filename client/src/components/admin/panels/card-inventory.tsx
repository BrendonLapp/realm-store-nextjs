import { useState } from 'react';
import { TabDisplay } from '../../../types/tab-display';
import Tabs from '../tab-nav/tabs';
import AddCardsByCSV from './section/add-cards-by-csv';
import AddCardsByName from './section/add-cards-by-name';
import UpdateCardInventory from './section/update-card-inventory';

const TabValues: TabDisplay[] = [
  {
    name: 'Add By CSV',
    Component: <AddCardsByCSV />,
  },
  {
    name: 'Add By Card Name',
    Component: <AddCardsByName />,
  },
  {
    name: 'Update Card Inventory',
    Component: <UpdateCardInventory />,
  },
];

const CardInventory = () => {
  const [tabs] = useState(TabValues);

  const [section, setSection] = useState(<AddCardsByCSV />);

  return (
    <>
      <Tabs tabs={tabs} defaultTab={tabs[0].name} setSection={setSection} />
      {section}
    </>
  );
};

export default CardInventory;
