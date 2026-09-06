import { DashboardCard } from './component/DashboardCard';
import { DashboardHeader } from './component/DashboardHeader';

export const UserDashboard = () => {
  // const {
  //   data: courses,
  //   error,
  //   isLoading,
  // } = useFetch("http://localhost:5000/api/v1/courses/", "courses");

  // if (isLoading) return <div>Loading courses...</div>;

  return (
    <>
      <DashboardHeader />
      <DashboardCard />
    </>
  );
};
