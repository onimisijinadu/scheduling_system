import {
  DeptIcon,
  RankIcon,
  UserIcon,
} from '../../../component/Icons';

export const Profile = ({ user }) => {
  const name = user.full_name;
  const range = user.invigilation_per_week;
  return (
    <div className="max-w-[309px] lg:max-w-[400px] h-fit p-6 rounded-sm bg-white border-border">
      <div className="flex flex-row md:flex-col lg:flex-row items-center gap-3 max-w-[256px] lg:max-w-[390px] min-h-[96px] pb-6 border-b-2 border-b-border">
        <UserIcon className="w-15.5 h-15.5" />
        <div className="flex flex-col gap-2 ">
          <p className="font-inter font-semibold text-base leading-6 text-[#0B1C30]">
            {name}
          </p>
          <span className="flex items-center gap-2 font-inter regular text-sm leading-5 text-[#3E4850]">
            <RankIcon className="w-4 h-4" /> <p>{user.lecturer_rank}</p>
          </span>
          <span className="flex items-center gap-2 font-inter regular text-sm leading-5 text-[#3E4850]">
            <DeptIcon className="w-4 h-4" /> <p>{user.department_name}</p>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <div className="flex justify-between gap-4 items-center">
          <p className="text-[#3E4850] font-inter font-bold text-xs leading-4">
            Weekly Duty Cap
          </p>
          <span
            className={`${range ? "text-[#00AEEF]" : "text-[#0B1C30]"}jetbrainsmono font-medium text-sm leading-5 `}
          >
            {user.invigilation_per_week}/14 shifts
          </span>
        </div>
        <div className="w-full h-3 rounded-xl bg-[#E5EEFF]">
          <div
            className={`${range <= 3 ? "w-1/4" : range <= 7 ? "w-1/3" : range <= 10 ? "w-1/2" : "w-full"} h-3 rounded-xl bg-[#00AEEF]`}
          ></div>
        </div>
      </div>
    </div>
  );
};
