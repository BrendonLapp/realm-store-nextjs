interface TabsNavProps {
  name: string;
  setActive: any;
  activeTab: string;
}

const TabsNav = ({ name, activeTab, setActive }: TabsNavProps) => {
  return (
    <li className="nav-item">
      <button
        className={`${activeTab === name ? `nav-link active` : `nav-link `}`}
        aria-current="page"
        onClick={() => setActive(name)}
      >
        {name}
      </button>
    </li>
  );
};

export default TabsNav;
