import { useEffect } from 'react';

import { toast } from 'react-toastify';

import { API_ENDPOINTS } from '../../../config/api';
import { useFetch } from '../../../fetch/useFetch';

export const DashboardCard = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useFetch(API_ENDPOINTS.DASHBOARDSTATS, "stats");

  useEffect(() => {
    console.log(stats);
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-accent" />
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4 overflow-hidden">
      <div className="p-4 rounded-sm bg-bg border border-border flex flex-col gap-3">
        <p className="font-sans font-bold leading-4 tracking-tight text-sm text-bg-third">
          Total Courses
        </p>
        <p className="jetbrainsmono font-md text-3xl sm:text-6xl text-text leading-9 tracking-tight">
          {stats.total_courses || 0}
        </p>
      </div>
      <div className="p-4 rounded-sm bg-bg border border-border flex flex-col gap-3 w-full">
        <p className="font-sans font-bold leading-4 tracking-tight text-sm text-bg-third">
          Total Venues
        </p>
        <p className="jetbrainsmono font-md text-3xl sm:text-6xl text-text leading-9 tracking-tight">
          {stats.total_venues || 0}
        </p>
      </div>
      <div className="p-4 rounded-sm bg-bg border border-border flex flex-col gap-3">
        <p className="font-sans font-bold leading-4 tracking-tight text-sm text-bg-third">
          Assigned Invigilators
        </p>
        <p className="jetbrainsmono font-md text-3xl sm:text-6xl text-text leading-9 tracking-tight">
          {stats.assigned_invigilation || 0}
        </p>
      </div>
      <div className="p-4 rounded-sm bg-bg border border-border flex flex-col gap-3">
        <p className="font-sans font-bold leading-4 tracking-tight text-sm text-bg-third">
          Clash Count
        </p>
        <p className="jetbrainsmono font-md text-3xl sm:text-6xl text-text leading-9 tracking-tight">
          {stats.total_conflicts || 0}
        </p>
      </div>
    </div>
  );
};
