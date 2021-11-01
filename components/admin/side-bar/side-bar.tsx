import Profile from './profile';
import SideNavItem from './side-nav-item';
import SealedInventory from '../sealed-inventory';
import Link from 'next/link';
import CardInventory from '../card-inventory';
import GalleryUpdate from '../panels/section/store-functions/gallery-update';

const SideBar = ({ setPanel }: any) => {
  return (
    <>
      <div className="bg-dark panel-slider">
        <br />
        <br />
        <br />
      </div>
      <div className="bg-dark">
        <div
          className="flex-shrink-0 p-3 bg-dark sidebar"
          style={{ width: '280px' }}
        >
          <Link href="/admin">
            <div className="d-flex align-items-center text-decoration-none link-light no-background btn btn-toggle">
              Home
            </div>
          </Link>

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
                    Panel={CardInventory}
                  />
                  <SideNavItem
                    name={'Sealed Inventory'}
                    setPanel={setPanel}
                    Panel={SealedInventory}
                  />
                </ul>
              </div>
            </li>
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed link-light no-padding"
                data-bs-toggle="collapse"
                data-bs-target="#home-collapse"
                aria-expanded="true"
              >
                Store functions
              </button>
              <div className="collapse show" id="home-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <SideNavItem
                    name={'Gallery'}
                    setPanel={setPanel}
                    Panel={GalleryUpdate}
                  />
                </ul>
              </div>
            </li>
            <Profile />
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
