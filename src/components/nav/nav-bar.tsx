import CartBox from './cart-box';
import NavItem from './nav-item';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container px-4 px-lg-5 left">
        <a className="navbar-brand" href="/">
          Realm Games
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <NavItem name="Home" link="/" />
            <NavItem name="Admin" link="/Admin" />
          </ul>
          <CartBox numberInCart={0} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
