import { Menu } from 'lucide-react';

import { UserIcon } from './Icons';

export const TopBar = ({ toggleSideBar, isOpen }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full h-[73px] px-3 sm:pl-4 sm:pr-8 py-4 lg:px-8 bg-bg border-b border-b-signin-color2">
      <div className="flex gap-3 ">
        <Menu
          className={`lg:hidden cursor-pointer ${isOpen ? "hidden" : "block"}`}
          onClick={toggleSideBar}
        />
        <h2 className="font-bold text-sans text-xl leading-7 text-text ">
          Faculty of Computing
        </h2>
      </div>
      <div>
        <UserIcon className="w-10 h-40" />
      </div>
    </div>
  );
};
// const HeaderTitle = {
//   1: "Faculty of Academic Excellence",
//   2: "Resource Management",
//   3: "",
//   4: "",
//   5: "",
//   6: "",
//   7: "Lecturer Personal Dashboard",
// };
