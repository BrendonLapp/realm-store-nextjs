interface NavItemProps {
  name: string;
  link: string;
}

const NavItem = ({ name, link }: NavItemProps) => {
  return (
    <li className="nav-item">
      <a className="nav-link active" aria-current="page" href={link}>
        {name}
      </a>
    </li>
  );
};

export default NavItem;
