import { useEffect, useMemo, useState } from "react";

import { MoreVertical } from "lucide-react";
import { toast } from "react-toastify";

import { Modal } from "../../../component/Modal";
import { Overlay } from "../../../component/Overly";
import { Pagination } from "../../../component/Pagination";
import { SelectOptions } from "../../../component/selectOption";
import { Table, TableWrapper } from "../../../component/Table";
import { API_ENDPOINTS } from "../../../config/api";
import { useFetch } from "../../../fetch/useFetch";
import { LecturerModal } from "./LecturersModal";

export const LecturersTable = () => {
  const {
    data: Lecturers,
    error: lecturers_error,
    isLoading: lecturers_isLoading,
    setData: setLecturers,
  } = useFetch(API_ENDPOINTS.LECTURERS, "lecturers");
  const {
    data: Courses,
    error: courses_error,
    isLoading: courses_isLoading,
  } = useFetch(API_ENDPOINTS.COURSES, "courses");
  // console.log(Lecturers);

  const {
    data: departments,
    error: departments_error,
    isLoading: departmentError,
  } = useFetch(API_ENDPOINTS.DEPARTMENTS, "departments");

  const [selectedAvailability, setSelectedAvailability] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRank, setSelectedRank] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [lecturer, setLecturer] = useState(null);

  const isLoading = lecturers_isLoading || courses_isLoading || departmentError;

  //function to filter course by department and levels
  const FilteredLecturer = useMemo(() => {
    if (!Array.isArray(Lecturers)) return [];

    return Lecturers.filter((lecturer) => {
      // 1. Availability filter (with null-safety)
      const status = lecturer.lecturer_status?.toLowerCase() || "";
      const matchesAvailability =
        selectedAvailability.toLowerCase() === "all" ||
        status === selectedAvailability.toLowerCase();

      // 2. Rank filter (normalize spaces and hyphens)
      const rank =
        lecturer.lecturer_rank?.toLowerCase().replace("-", " ") || "";
      const cleanSelectedRank = selectedRank.toLowerCase().replace("-", " ");
      const matchesRank =
        cleanSelectedRank === "all" || rank === cleanSelectedRank;

      // 3. Department filter (case-insensitive)
      const dept = lecturer.department_code?.toUpperCase() || "";
      const matchesDepartment =
        selectedDepartment.toLowerCase() === "all" ||
        dept === selectedDepartment.toUpperCase();

      return matchesAvailability && matchesRank && matchesDepartment;
    });
  }, [Lecturers, selectedAvailability, selectedDepartment, selectedRank]);

  // function for display courses
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const DisplayLecturers = FilteredLecturer.slice(startIndex, endIndex);
  const totalPages = Math.ceil(FilteredLecturer.length / itemsPerPage);

  // function to check for error
  useEffect(() => {
    const error = lecturers_error || courses_error || departments_error;
    if (error) {
      toast.error(error);
    }
  }, [lecturers_error, courses_error, departments_error]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAvailability, selectedDepartment, selectedRank]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2 text-sm font-medium text-slate-600">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-accent" />
        <span>Loading...</span>
      </div>
    );
  }
  const handleClick = (id) => {
    setLecturer(id);
    setIsOpen(true);
    console.log(lecturer);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row  gap-4 w-full sm:justify-between  sm:items-center pb-4 my-2">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="py-2 px-4 rounded-sm border border-border bg-bg">
              <SelectOptions
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="font-sans w-full regular text-sm leading-5 text-text outline-none"
              >
                <option value="all">All Departments</option>
                <option value="CSC">Computer Science</option>
                <option value="CBS">Cyber Security</option>
                <option value="SWE">Software Engineering</option>
                <option value="IT">Information Technology</option>
              </SelectOptions>
            </div>
            <div className="py-2 px-4 rounded-sm border border-border bg-bg">
              <SelectOptions
                value={selectedRank}
                onChange={(e) => setSelectedRank(e.target.value)}
                className="font-sans w-full regular text-sm leading-5 text-text outline-none"
              >
                <option value="all">All Academic Ranks</option>
                <option value="senior lecturer">Senior Lecturer</option>
                <option value="professor">Professor</option>
                <option value="associate professor">Associate Professor</option>
                <option value="assistant lecturer">Assistant Lecturer</option>
                <option value="Lecturer I">Lecturer I</option>
              </SelectOptions>
            </div>
            <div className="py-2 px-4 rounded-sm border border-border bg-bg">
              <SelectOptions
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="font-sans w-full regular text-sm leading-5 text-text outline-none"
              >
                <option value="all">Availability: All</option>
                <option value="available">Available</option>
                <option value="on leave">On Leave</option>
                <option value="absent">Absent</option>
              </SelectOptions>
            </div>
          </div>
          {/* <div className="flex text-center items-center">
            <Button className="flex  text-center items-center gap-1 bg-accent text-bg rounded-sm px-4 py-2 font-sans font-semibold text-sm leading-5 hover:backdrop:brightness-90 transition-colors">
              <PlusIcon className="w-4 h-4" /> Add Lecturer
            </Button>
          </div> */}
        </div>
        {!isLoading && (
          <TableWrapper>
            <Table>
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-b-[#CBD5E1] text-left text-text-h font-sans font-bold text-xs leading-4 tracking-wide">
                  <td className="px-3 py-3 text-wrap whitespace-wrap">NAME</td>
                  <td className="px-4 py-3 whitespace-nowrap">EMAIL</td>
                  {/* <td className="px-4 py-3">TYPE</td> */}
                  <td className="px-4 py-3">DEPARTMENT</td>
                  <td className="px-4 py-3">ACADEMIC RANK</td>
                  <td className="px-4 py-3 text-right">ASSIGNED COURSES</td>
                  <td className="px-4 py-3">INVIGILATION PER WEEK</td>
                  <td className="px-4 py-3 text-center">STATUS</td>
                  <td className="px-4 py-3 text-center">ACTIONS</td>
                </tr>
              </thead>
              <tbody>
                {DisplayLecturers.map((lecturer, index) => {
                  return (
                    <tr
                      key={lecturer.lecturer_id}
                      className={`text-left ${DisplayLecturers.length - 1 === index ? "" : "border-b border-b-border"}`}
                    >
                      <td className="px-4 py-2 text-text font-sans font-medium text-xs leading-4">
                        {lecturer.full_name}
                      </td>
                      <td className="px-4 py-2 text-text jetbrainsmono regular text-[11px] leading-4">
                        {lecturer.email}
                      </td>
                      {/* <td className="px-4 py-2 font-sans font-medium text-sm leading-5 text-text">
                      {lecturer.lecturer_title}
                    </td> */}
                      <td
                        className={`px-4 py-2 text-center font-sans font-bold text-sm leading-5 text-text-h`}
                      >
                        {lecturer.department_code}
                      </td>
                      <td className="px-4 py-2 text-center font-sans font-medium text-xs leading-5 text-text-h">
                        {lecturer.lecturer_rank}
                      </td>
                      <td className="px-4 py-2 text-right font-sans font-medium text-xs leading-4 text-text">
                        {lecturer.assigned_courses.length} Courses
                      </td>
                      <td className="px-4 py-2 text-center font-sans font-medium text-xs leading-4 text-text">
                        {lecturer.invigilation_per_week}
                      </td>
                      <td className="px-4 py-2">
                        <p
                          className={`flex items-center gap-2 font-sans text-semibold text-xs leading-4 px-3 py-2 rounded-full w-fit ${lecturer.lecturer_status.toLowerCase() === "available" ? "text-[#15803D] bg-green-200" : "text-[#BE185D] bg-red-400/30"}`}
                        >
                          {lecturer.lecturer_status.toLowerCase() ===
                          "available" ? (
                            <div className="rounded-full w-1.5 h-1.5 bg-green-400"></div>
                          ) : (
                            <div className="rounded-full w-1.5 h-1.5 bg-red-400"></div>
                          )}
                          {lecturer.lecturer_status}
                        </p>
                      </td>

                      <td
                        onClick={() => handleClick(lecturer.lecturer_id)}
                        className="flex items-center gap-2 px-5 py-2 text-right"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className="flex justify-between items-center whitespace-nowrap gap-4 py-3  px-4 bg-[#F8FAFC] border-t border-t-[#CBD5E1]">
              <div className="font-sans regular text-sm leading-5 text-text-h">
                showing {FilteredLecturer.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.ceil(endIndex, FilteredLecturer.length)} of{" "}
                {FilteredLecturer.length} entries
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
      {isOpen && (
        <>
          <Overlay isOverly={isOpen} onClose={closeModal} />
          <Modal isModalOpen={isOpen}>
            <LecturerModal
              lecturerId={lecturer}
              close={closeModal}
              Lecturers={Lecturers}
              setLecturers={setLecturers}
              allDepartments={departments}
              allCourses={Courses}
            />
          </Modal>
        </>
      )}
    </>
  );
};
