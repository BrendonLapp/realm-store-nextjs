interface SideNavItemProps {
  name: string;
  setPanel: any;
  Panel: any;
}

const SideNavItem = ({ name, setPanel, Panel }: SideNavItemProps) => {
  return (
    <li>
      <button
        className="link-light rounded"
        onClick={() => setPanel(<Panel />)}
      >
        {name}
      </button>
    </li>
  );
};

export default SideNavItem;
