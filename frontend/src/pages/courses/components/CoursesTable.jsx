import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { PlusIcon } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '../../../component/Button';
import { Pagination } from '../../../component/Pagination';
import { SelectOptions } from '../../../component/selectOption';
import {
  Table,
  TableWrapper,
} from '../../../component/Table';
import { API_ENDPOINTS } from '../../../config/api';
import { useFetch } from '../../../fetch/useFetch';

export const CoursesTable = () => {
  const {
    data: courses,
    error,
    isLoading,
  } = useFetch(API_ENDPOINTS.COURSES, "courses");
  // console.log(courses);

  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //function to filter course by department and levels
  const FilteredCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];

    return courses.filter((course) => {
      const matchesDept =
        selectedDept === "all" || selectedDept === course.code;

      const matchesLevel =
        selectedLevel === "all" ||
        Number(selectedLevel) === course.course_level;

      return matchesDept && matchesLevel;
    });
  }, [courses, selectedDept, selectedLevel]);

  // function for display courses
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const DisplayCourses = FilteredCourses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(FilteredCourses.length / itemsPerPage);

  // function to check for error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDept, selectedLevel]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-accent" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row  gap-4 w-full sm:justify-between  sm:items-center pb-4 my-2">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="py-2 px-4 rounded-sm border border-border bg-bg">
            <SelectOptions
              onChange={(e) => setSelectedDept(e.target.value)}
              className="font-sans w-full regular text-sm leading-5 text-text outline-none"
            >
              <option value="all">All Department</option>
              <option value="CSC">Computer Science</option>
              <option value="CBS">Cyber Security</option>
              <option value="SWE">Software Enginerring</option>
              <option value="IT">Information Technology</option>
            </SelectOptions>
          </div>
          <div className="py-2 px-4 rounded-sm border border-border bg-bg">
            <SelectOptions
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="font-sans w-full regular text-sm leading-5 text-text outline-none"
            >
              <option value="all">All Level</option>
              <option value="100">Level One</option>
              <option value="200">Level Two</option>
              <option value="300">Level Three</option>
              <option value="400">Level Four</option>
            </SelectOptions>
          </div>
        </div>
        <div className="flex text-center items-center">
          <Button className="flex  text-center items-center gap-1 bg-accent text-bg rounded-sm px-4 py-2 font-sans font-semibold text-sm leading-5 hover:backdrop:brightness-90 transition-colors">
            <PlusIcon className="w-4 h-4" /> Add Course
          </Button>
        </div>
      </div>
      {!isLoading && (
        <TableWrapper>
          <Table>
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-b-[#CBD5E1] text-left text-text-h font-sans font-bold text-xs leading-4 tracking-wide">
                <td className="px-3 py-3 text-wrap whitespace-wrap">
                  COURSE CODE
                </td>
                <td className="px-4 py-3 whitespace-nowrap">COURSE TITLE</td>
                <td className="px-4 py-3">DEPARTMENT</td>
                <td className="px-4 py-3">LEVEL</td>
                <td className="px-4 py-3">CREDIT UNITS</td>
                <td className="px-4 py-3 text-right">TOTAL ENROLLMENT</td>
                <td className="px-4 py-3">ASSIGNED LEAD LECTURER</td>
                <td className="px-4 py-3">ACTIONS</td>
              </tr>
            </thead>
            <tbody>
              {DisplayCourses.map((course, index) => {
                const leadLecturer = course.lecturers.find((l) => l.is_lead);
                return (
                  <tr
                    key={course.id}
                    className={`text-left ${DisplayCourses.length - 1 === index ? "" : "border-b border-b-border"}`}
                  >
                    <td className="px-4 py-2 text-text jetbrainsmono font-medium text-xs leading-4">
                      {course.course_code}
                    </td>
                    <td className="px-4 py-2 font-sans font-medium text-sm leading-5 text-text">
                      {course.course_title}
                    </td>
                    <td className={`px-4 py-2`}>
                      <p
                        className={`font-sans text-semibold text-xs leading-4 px-2 py-1 rounded-full w-fit ${course.code === "CSC" ? "text-accent bg-accent/10" : course.code === "SWE" ? "text-[#7E22CE] bg-purple-400/50" : course.code === "CBS" ? "text-[#BE185D] bg-red-400/30" : "text-[#15803D] bg-green-200"}`}
                      >
                        {course.code}
                      </p>
                    </td>
                    <td className="px-4 py-2 text-center font-sans regular text-sm leading-5 text-text-h">
                      {course.course_level}
                    </td>
                    <td className="px-4 py-2 text-center jetbrainsmono font-medium text-xs leading-4 text-text">
                      {course.course_unit}
                    </td>
                    <td className="px-4 py-2 text-right jetbrainsmono font-medium text-xs leading-4 text-text">
                      {course.total_enrolled}
                    </td>
                    <td className="whitespace-nowrap px-5 py-2 font-sans regular text-sm leading-5 text-text-h">
                      {leadLecturer ? (
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-800">
                              {leadLecturer.full_name}
                            </span>
                            {leadLecturer.rank && (
                              <span className="text-[11px] text-slate-400">
                                {leadLecturer.rank}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs italic text-slate-400">
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-2 text-right">
                      <button
                        type="button"
                        className="text-slate-400 hover:text-accent font-bold px-2 py-1"
                      >
                        •••
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="flex justify-between items-center whitespace-nowrap gap-4 py-3  px-4 bg-[#F8FAFC] border-t border-t-[#CBD5E1]">
            <div className="font-sans regular text-sm leading-5 text-text-h">
              showing {FilteredCourses.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.ceil(endIndex, FilteredCourses)} of {FilteredCourses.length}{" "}
              entries
            </div>
            <Pagination
              page={currentPage}
              totalPage={totalPages}
              onChange={(value) => setCurrentPage(value)}
            />
          </div>
        </TableWrapper>
      )}
    </div>
  );
};

{
  /* Numeric Page Pills
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => {
                      const isActive = currentPage === pageNum;

                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`min-w-[32px] h-8 rounded px-2 text-xs font-semibold transition-colors ${
                            isActive
                              ? "bg-[#0099FF] text-white shadow-sm"
                              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    },
                  )}
                </div> */
}
