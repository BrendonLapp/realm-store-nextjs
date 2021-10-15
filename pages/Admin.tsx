import { useState } from 'react';
import AdminHome from '../src/components/admin/panels/admin-home';
import SideBar from '../src/components/admin/side-bar/side-bar';

const Admin = () => {
  const [panel, setPanel] = useState(<AdminHome />);

  const DisplayPanel = (panelToDisplay: any) => {
    setPanel(panelToDisplay);
  };

  return (
    <>
      {/* <SideBar setPanel={DisplayPanel} /> */}
      {/* <div className="left-panel-padding">{panel}</div> */}
      <div>test</div>
    </>
  );
};

export default Admin;
