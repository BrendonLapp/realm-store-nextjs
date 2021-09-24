import { Route } from 'react-router';
import NavItem from '../nav/nav-item';
import AdminHome from './pages/admin-home';
import AdminHome2 from './pages/admin-home2';

const SideBar = ({ setPanel }: any) => {
  return (
    <div
      className="flex-shrink-0 p-3 bg-dark sidebar"
      style={{ width: '280px;' }}
    >
      <a
        href="/"
        className="d-flex align-items-center pb-3 mb-3 text-decoration-none border-bottom link-light"
      >
        Admin
      </a>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed link-light"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="true"
          >
            Home
          </button>
          <div className="collapse show" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <button
                  className="link-light rounded"
                  onClick={() => setPanel(<AdminHome />)}
                >
                  Admin Home
                </button>
              </li>
              <li>
                <button
                  className="link-light rounded"
                  onClick={() => setPanel(<AdminHome2 />)}
                >
                  Admin Home 2
                </button>
              </li>
            </ul>
          </div>
        </li>
        <div className="sidebar-profile">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/brendonlapp.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>Brendon</strong>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default SideBar;
