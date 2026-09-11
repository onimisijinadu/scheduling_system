// Vite uses import.meta.env, CRA uses process.env
const BASEURL =
  import.meta.env?.VITE_API_BASE_URL ||
  process.env?.REACT_BASE_URL ||
  "http://localhost:5000/api/v1";

export const API_ENDPOINTS = {
  COURSES: `${BASEURL}/courses`,
  DEPARTMENTS: `${BASEURL}/departments`,
  USERS: `${BASEURL}/users`,
  HALLS: `${BASEURL}/halls`,
  LECTURERS: `${BASEURL}/lecturers`,
  DASHBOARDSTATS: `${BASEURL}/dashboardStats`,
};

export default BASEURL;
