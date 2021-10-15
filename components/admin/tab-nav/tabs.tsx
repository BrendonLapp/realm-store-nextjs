import TabsNav from './tabs-nav';
import { useState } from 'react';
import { TabDisplay } from '../../../types/tab-display';

interface TabsProps {
  tabs: TabDisplay[];
  defaultTab: string;
  setSection: any;
}

const Tabs = ({ tabs, defaultTab, setSection }: TabsProps) => {
  const [active, setActive] = useState(defaultTab);

  return (
    <ul className="nav nav-tabs pt-2">
      {tabs.map((tab) => (
        <TabsNav
          key={tab.name}
          name={tab.name}
          activeTab={active}
          setActive={setActive}
          sectionComponent={tab.Component}
          setSection={setSection}
        />
      ))}
    </ul>
  );
};

export default Tabs;
