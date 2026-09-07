import { DashboardCard } from './component/DashboardCard';
import { DashboardHeader } from './component/DashboardHeader';
import { RecentAdjustment } from './component/RecentAdjustment';
import { UpcomingSessions } from './component/UpcomingSession';

export const UserDashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardCard />
      <div className="flex flex-col lg:flex-row gap-4 w-full pt-6 ">
        <UpcomingSessions />
        <RecentAdjustment />
      </div>
    </>
  );
};
