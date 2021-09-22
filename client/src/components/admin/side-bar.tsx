const SideBar = () => {
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
                <a href="#" className="link-light rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed link-light"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            Dashboard
          </button>
          <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-light rounded">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Weekly
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Monthly
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Annually
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn btn-toggle align-items-center rounded collapsed link-light"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            Orders
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-light rounded">
                  New
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Processed
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Shipped
                </a>
              </li>
              <li>
                <a href="#" className="link-light rounded">
                  Returned
                </a>
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
                New project...
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
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
