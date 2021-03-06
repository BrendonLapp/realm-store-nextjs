import React, { useState } from 'react';
import { TabDisplay } from '../../types/card';
import AddCardsByName from './panels/section/add-card-section/add-cards-by-name';
import AddCardsByCSV from './panels/section/add-card-section/add-cards-by-csv';
import UpdateCardInventory from './panels/section/update-card-section/update-card-inventory';
import Tabs from './tab-nav/tabs';

const TabValues: TabDisplay[] = [
  {
    name: 'Add By Card Name',
    Component: <AddCardsByName />,
  },
  {
    name: 'Add By CSV',
    Component: <AddCardsByCSV />,
  },
  {
    name: 'Update Card Inventory',
    Component: <UpdateCardInventory />,
  },
];

const CardInventory = () => {
  const [tabs] = useState(TabValues);

  const [section, setSection] = useState(<AddCardsByName />);

  return (
    <>
      <Tabs tabs={tabs} defaultTab={tabs[0].name} setSection={setSection} />
      {section}
    </>
  );
};

export default CardInventory;
