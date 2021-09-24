import { useState } from 'react';
import AdminHome from '../components/admin/pages/admin-home';
import SideBar from '../components/admin/side-bar';

const Admin = () => {
  const [panel, setPanel] = useState(<AdminHome />);

  const DisplayPanel = (panelToDisplay: any) => {
    setPanel(panelToDisplay);
  };

  return (
    <>
      <SideBar setPanel={DisplayPanel} />
      {panel}
    </>
  );
};

export default Admin;
