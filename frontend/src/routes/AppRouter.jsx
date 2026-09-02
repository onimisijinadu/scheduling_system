import React from 'react';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router';

import { Login } from '../pages/auth_page/login';
import { CoursesPage } from '../pages/courses/CoursesPage';
import { UserDashboard } from '../pages/dashboard/UserDashboard';
import { DashboardLayout } from '../pages/dashboard_layout/DashboardLayout';
import {
  InvigilationRoster,
} from '../pages/invigilation_roster/InvigilaionRosterPage';
import { LecturersPage } from '../pages/lecturers/LecturersPage';
import { MasterTimeTable } from '../pages/master_timetable/MasterTimetable';
import { NlpCommandInterface } from '../pages/nlp_commands/NlpCommandInterface';
import { Venues } from '../pages/venues/Venues';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="/dashboard/course_page" element={<CoursesPage />} />
          <Route
            path="/dashboard/invigilation_roster"
            element={<InvigilationRoster />}
          />
          <Route path="/dashboard/Lecturers" element={<LecturersPage />} />
          <Route
            path="/dashboard/MasterTimeTable"
            element={<MasterTimeTable />}
          />
          <Route
            path="/dashboard/nlp_command_interface"
            element={<NlpCommandInterface />}
          />
          <Route path="/dashboard/venues" element={<Venues />} />
          {/* Catch-all 404 redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};
