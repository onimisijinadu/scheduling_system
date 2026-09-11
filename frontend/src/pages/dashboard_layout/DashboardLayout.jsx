import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Outlet,
  useNavigate,
} from 'react-router';

import { SideBar } from '../../component/SideBar';
import { TopBar } from '../../component/TopBar';

export const DashboardLayout = () => {
  const sideNavRef = useRef(null);
  const navigate = useNavigate();

  const [sidebarToggle, setSideBarToggle] = useState(false);

  const handleClick = () => {
    setSideBarToggle((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {};
  }, []);
  return (
    <div className="flex h-screen max-w-screen overflow-y-auto relative">
      <SideBar
        rel={sideNavRef}
        toggleSideBar={handleClick}
        isOpen={sidebarToggle}
        onLogout={() => navigate("/login")}
      />
      <div className="flex flex-1 flex-col">
        <TopBar toggleSideBar={handleClick} isOpen={sidebarToggle} />
        <main className="flex-1 overflow-y-auto p-6 sm:mb-0 bg-[#E5EEFF]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
