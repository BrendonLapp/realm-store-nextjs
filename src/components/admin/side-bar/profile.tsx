const Profile = () => {
  return (
    <div className="sidebar-profile">
      <button
        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle no-background no-border"
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
      </button>
      <ul
        className="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser1"
      >
        <li>
          <button className="dropdown-item no-background no-border">
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
