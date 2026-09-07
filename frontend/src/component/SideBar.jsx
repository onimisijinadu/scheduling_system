import {
  ArrowLeftSquare,
  CodeSquare,
  GraduationCap,
  LayoutDashboardIcon,
  Table,
  User2,
  UserSquare,
  XIcon,
} from 'lucide-react';
import {
  Link,
  useLocation,
} from 'react-router';

const NavLinks = [
  {
    name: "Dashboard",
    path: "/dashboard/",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Courses",
    path: "/dashboard/course_page",
    icon: GraduationCap,
  },
  {
    name: "Lecturers",
    path: "/dashboard/Lecturers",
    icon: User2,
  },
  {
    name: "Master Timetable",
    path: "/dashboard/MasterTimeTable",
    icon: Table,
  },
  {
    name: "Invigilation Roster",
    path: "/dashboard/invigilation_roster",
    icon: UserSquare,
  },
  {
    name: "NLP Commands",
    path: "/dashboard/nlp_command_interface",
    icon: CodeSquare,
  },
];

export const SideBar = ({ rel, isOpen, toggleSideBar }) => {
  const location = useLocation();

  const handleClick = () => {
    if (window.innerHeight < 1024) {
      toggleSideBar();
    }
  };
  return (
    <div
      rel={rel}
      className={`fixed lg:static flex flex-col justify-between items-center h-dvh transform tarnsition-transform duration-300 z-10 w-[256px] bg-bg border-r border-r-[#BDC8D1] ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="gap-2 px-4 py-6 w-full">
        <div className="flex justify-between items-center w-full h-[64px] px-4 pb-8">
          <p className="text-accent font-sans text-2xl font-bold leading-8 tracking-tight">
            Exam Portal
          </p>
          <div
            className={`flex items-center p-1 hover:bg-[#E5EEFF] cursor-pointer rounded-lg lg:hidden`}
            onClick={toggleSideBar}
          >
            <XIcon className="w-5 h-5 text-accent" />
          </div>
        </div>
        <div className="w-full">
          {NavLinks.map((link, index) => {
            const isOpen = location.pathname === link.path;
            // location.pathname.startsWith(`${link.path}/`);
            return (
              <div
                key={index}
                className={`flex flex-col items-start gap-3 px-4 py-3 h-[44px] rounded-lg ${isOpen ? "bg-[#E5EEFF] text-[#00658D]" : "text-[#3E4850]"} w-full`}
                onClick={handleClick}
              >
                <Link
                  to={link.path}
                  className={`flex flex-row font-Inter gap-1 regular text-sm leading-5 w-full`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 w-full px-9 py-6 text-sm regular cursor-pointer text-[#3E4850]">
        <ArrowLeftSquare className="w-5 h-5" /> Logout
      </div>
    </div>
  );
};
