interface TabsNavProps {
  name: string;
  setActive: any;
  activeTab: string;
  setSection: any;
  sectionComponent: any;
}

const TabsNav = ({
  name,
  activeTab,
  setActive,
  sectionComponent,
  setSection,
}: TabsNavProps) => {
  const setActivePanel = () => {
    setActive(name);
    setSection(sectionComponent);
  };

  return (
    <li className="nav-item">
      <button
        className={`${activeTab === name ? `nav-link active` : `nav-link `}`}
        aria-current="page"
        onClick={setActivePanel}
      >
        {name}
      </button>
    </li>
  );
};

export default TabsNav;
