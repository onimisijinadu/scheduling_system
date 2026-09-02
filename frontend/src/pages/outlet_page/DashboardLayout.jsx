import { Outlet } from 'react-router';

import { SideBar } from '../sidebar/SideBar';

export const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
