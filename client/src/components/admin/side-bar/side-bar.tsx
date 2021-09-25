import { Route } from 'react-router';
import NavItem from '../../nav/nav-item';
import AdminHome from '../panels/admin-home';
import AddCards from '../panels/card-inventory';
import Profile from './profile';
import SideNavItem from './side-nav-item';
import AddSealed from '../panels/sealed-inventory';

const SideBar = ({ setPanel }: any) => {
  return (
    <div
      className="flex-shrink-0 p-3 bg-dark sidebar"
      style={{ width: '280px' }}
    >
      <button
        className="d-flex align-items-center text-decoration-none link-light no-background btn btn-toggle "
        onClick={() => setPanel(<AdminHome />)}
      >
        Home
      </button>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed link-light no-padding"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Inventory
          </button>
          <div className="collapse show" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <SideNavItem
                name={'Cards Inventory'}
                setPanel={setPanel}
                Panel={AddCards}
              />
              <SideNavItem
                name={'Sealed Inventory'}
                setPanel={setPanel}
                Panel={AddSealed}
              />
            </ul>
          </div>
        </li>
        <Profile />
      </ul>
    </div>
  );
};

export default SideBar;
