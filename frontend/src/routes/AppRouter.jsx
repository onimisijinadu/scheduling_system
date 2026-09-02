import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router';

import { Login } from '../pages/auth_page/login';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
