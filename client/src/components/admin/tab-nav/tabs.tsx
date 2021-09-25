import TabsNav from './tabs-nav';
import { useState } from 'react';

interface TabsProps {
  tabs: string[];
  defaultTab: string;
}

const Tabs = ({ tabs, defaultTab }: TabsProps) => {
  const [active, setActive] = useState(defaultTab);

  return (
    <ul className="nav nav-tabs pt-2">
      {tabs.map((tab) => (
        <TabsNav
          key={tab}
          name={tab}
          activeTab={active}
          setActive={setActive}
        />
      ))}
    </ul>
  );
};

export default Tabs;
