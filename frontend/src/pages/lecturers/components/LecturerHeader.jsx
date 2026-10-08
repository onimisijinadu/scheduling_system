import { DownloadIcon } from 'lucide-react';

export const Header = ({ activeUser }) => {
  const name = activeUser.full_name.slice(0, 11);
  return (
    <div className="flex flex-col md:flex-row gap-4 items-left justify-between">
      <div>
        <h2 className="font-inter font-semibold text-xl leading-7 text-left text-[#0B1C30] ">
          Welcome back, {name}
        </h2>
        <p className="regular text-sm leading-5 text-[#3E4850]">
          Review your scheduled invigilation duties for the upcoming examination
          period
        </p>
      </div>
      <div className="max-w-[413.31px] h-[64px]">
        <button className="bg-[#00AEEF] text-[#FFFFFF] rounded-lg cursor-pointer hover:bg-accent-bg hover:text-white/70 font-inter font-semibold text-base leading-6 w-full  h-full flex items-center gap-[31px] pl-4 py-2 pr-9">
          <DownloadIcon className="w-10 h-10" /> Download Personal Invigilation
          Duty Slip (PDF)
        </button>
      </div>
    </div>
  );
};
