import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Edit2,
  PlusIcon,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '../../../component/Button';
import {
  FormInputs,
  FormWrapper,
  Modal,
} from '../../../component/Modal';
import { Overlay } from '../../../component/Overly';
import { Pagination } from '../../../component/Pagination';
import { SelectOptions } from '../../../component/selectOption';
import {
  Table,
  TableWrapper,
} from '../../../component/Table';
import { API_ENDPOINTS } from '../../../config/api';
import {
  PostRequest,
  useDeleteRequest,
  usePutRequest,
} from '../../../fetch/postRequest';
import { useFetch } from '../../../fetch/useFetch';

export const CoursesTable = () => {
  // 1. Fetch Courses
  const {
    data: courses,
    error: coursesError,
    isLoading: isCoursesLoading,
    setData: setCourses,
  } = useFetch(API_ENDPOINTS.COURSES, "courses");
  // console.log(courses);

  // 2. Fetch Departments
  const {
    data: departments,
    error: deptsError,
    isLoading: isDeptsLoading,
  } = useFetch(API_ENDPOINTS.DEPARTMENTS, "departments");

  // // 3. Fetch Lecturers
  const {
    data: lecturers,
    error: lecturersError,
    isLoading: isLecturersLoading,
  } = useFetch(API_ENDPOINTS.LECTURERS, "lecturers");
  // console.log(lecturers);

  //post course
  const {
    postData: postCourse,
    isLoading: uploadIsLoading,
    error: uploadError,
  } = PostRequest(API_ENDPOINTS.COURSES);

  // put course
  const {
    updateData: updateCourse,
    isLoading: updateCourseLoading,
    error: courseUpdateError,
  } = usePutRequest(API_ENDPOINTS.COURSES, "courses");

  //delete course
  const {
    deleteRecord: deleteCourse,
    error: errorOnDelete,
    isLoading: isDeleting,
  } = useDeleteRequest(API_ENDPOINTS.COURSES, "courses");

  // Combined loading state for initial page render
  const isLoading =
    isCoursesLoading ||
    isDeptsLoading ||
    isLecturersLoading ||
    uploadIsLoading ||
    updateCourseLoading ||
    isDeleting;

  // Handle errors
  useEffect(() => {
    const activeError =
      coursesError ||
      deptsError ||
      lecturersError ||
      uploadError ||
      courseUpdateError ||
      errorOnDelete;
    if (activeError) {
      toast.error(activeError);
    }
  }, [
    coursesError,
    deptsError,
    lecturersError,
    uploadError,
    courseUpdateError,
    errorOnDelete,
  ]);

  const initialFormState = {
    course_code: "",
    course_level: "",
    course_title: "",
    course_unit: "",
    total_enrolled: "",
    department_id: "",
    lecturer_id: "",
  };

  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);

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

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDept, selectedLevel]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-accent" />
        <span>Loading...</span>
      </div>
    );
  }

  // function to add course

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("payload", formData);
      if (editingCourseId) {
        const response = await updateCourse(
          editingCourseId,
          "courses",
          formData,
        );

        const updatedCourse = response.data.courses || response.data;

        setCourses((prev) =>
          prev.map((c) =>
            c.id === editingCourseId ? { ...c, ...updatedCourse } : c,
          ),
        );
        toast.success("Course updated successfully!");
      } else {
        const res = await postCourse("courses", formData);
        const newCourse = res.data.courses || res.data;
        setCourses((prev) => [newCourse, ...prev]);
        toast.success("Course added successfully!");
        setFormData(initialFormState);
      }
    } catch (err) {
      toast.error(err.message || "Failed to add course");
    } finally {
      setIsOpen(false);
    }
  };

  const handleConfirm = (message) => {
    if (message === "yes") {
      setConfirm(true);
      setIsConfirm(false);
    } else if (message === "no") {
      setConfirm(false);
      setIsConfirm(false);
    }
  };

  const handleDeleteCourse = async (course) => {
    // const confirm = window.confirm("Are you sure you want delete?");

    setIsConfirm(true);
    if (!confirm) return;

    try {
      await deleteCourse(course.id);
      setCourses((prev) => prev.filter((f) => f.id !== course.id));
      toast.success(`${course.course_code} deleted successfully!`);
      setIsConfirm(false);
    } catch (err) {
      toast.error(err.message || "Failed to delete course");
    }
  };

  const editCourse = (course) => {
    setEditingCourseId(course.id);

    const leadLecturer = course.lecturers?.find((l) => l.is_lead);

    setFormData({
      course_code: course.course_code || "",
      course_level: Number(course.course_level) || "",
      course_title: course.course_title || "",
      course_unit: Number(course.course_unit) || "",
      total_enrolled: Number(course.total_enrolled) || "",
      department_id: Number(course.department_id) || "",
      lecturer_id: leadLecturer ? Number(leadLecturer.lecturer_id) : "",
    });

    setIsOpen(true);
  };

  const handleAddCourse = () => {
    setEditingCourseId(null);
    setFormData(initialFormState);
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingCourseId(null);

    setFormData(initialFormState);
  };
  return (
    <>
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
            <Button
              onClick={handleAddCourse}
              className="flex  text-center items-center gap-1 bg-accent text-bg rounded-sm px-4 py-2 font-sans font-semibold text-sm leading-5 hover:backdrop:brightness-90 transition-colors"
            >
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
                      <td className="flex items-center gap-2 px-5 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => editCourse(course)}
                          className=" bg-slate-300 text-slate-500 hover:text-slate-400 font-bold p-2 rounded-lg cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCourse(course)}
                          className=" bg-red-300 text-red-500 hover:text-red-400 font-bold p-2 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
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
                {Math.ceil(endIndex, FilteredCourses)} of{" "}
                {FilteredCourses.length} entries
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
          <Modal onCloseModal={closeModal} isModalOpen={isOpen}>
            <FormWrapper handleSubmit={handleSubmit}>
              <FormInputs
                label={"COURSE CODE"}
                id={"course_code"}
                htmlFor={"course_code"}
                name={"course_code"}
                type={"text"}
                placeholder={"CSC 123"}
                value={formData.course_code}
                onChange={handleChange}
              />
              <FormInputs
                label={"COURSE TITLE"}
                id={"course_title"}
                htmlFor={"course_title"}
                name={"course_title"}
                type={"text"}
                placeholder={"Introduction to Computer science"}
                value={formData.course_title}
                onChange={handleChange}
              />
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="department_id"
                  className="text-xs font-bold text-slate-600"
                >
                  DEPARTMENT
                </label>
                <select
                  id="department_id"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                  className="rounded border border-[#BDC8D1] bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-accent"
                >
                  <option value="">Select Department</option>
                  {Array.isArray(departments) &&
                    departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.department_name} — {dept.code}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex items-center gap-4 w-full">
                <FormInputs
                  label={"LEVEL"}
                  id={"course_level"}
                  htmlFor={"course_level"}
                  name={"course_level"}
                  type={"number"}
                  placeholder={"100"}
                  value={formData.course_level}
                  onChange={handleChange}
                />
                <FormInputs
                  label={"CREDIT UNIT"}
                  id={"course_unit"}
                  htmlFor={"course_unit"}
                  name={"course_unit"}
                  type={"number"}
                  placeholder={"3"}
                  value={formData.course_unit}
                  onChange={handleChange}
                />
              </div>
              <FormInputs
                id={"total_enrolled"}
                label={"TOTAL ENROLLMENT"}
                htmlFor={"total_enrolled"}
                name={"total_enrolled"}
                type={"number"}
                placeholder={"300"}
                value={formData.total_enrolled}
                onChange={handleChange}
              />
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="lecturer_id"
                  className="text-xs font-bold text-slate-600"
                >
                  ASSIGN LEAD LECTURER
                </label>
                <select
                  id="lecturer_id"
                  name="lecturer_id"
                  value={formData.lecturer_id}
                  onChange={handleChange}
                  className="rounded border border-[#BDC8D1] bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-accent"
                >
                  <option value="">Select Lecturer (Optional)</option>
                  {Array.isArray(lecturers) &&
                    lecturers.map((lec) => (
                      <option key={lec.lecturer_id} value={lec.lecturer_id}>
                        {lec.full_name} — {lec.lecturer_rank || "Lecturer"}
                      </option>
                    ))}
                </select>
              </div>
              <Button type="submit">
                {editingCourseId ? "Update Course" : "Add Course"}
              </Button>
            </FormWrapper>
          </Modal>
        </>
      )}

      {isConfirm && (
        <>
          <Overlay
            isOverly={isConfirm}
            onClose={() => setIsConfirm((prev) => !prev)}
          />
          <Modal
            onCloseModal={() => setIsConfirm((prev) => !prev)}
            isModalOpen={isConfirm}
          >
            <div className="flex flex-col gap-2 items-center w-fit p-4 bg-white">
              <p className="text-red-600 font-semibold text-sm">
                Are you sure you want to delete this course?
              </p>
              <div className="flex gap-5 justify-center items-center w-full">
                <button
                  onClick={() => handleConfirm("yes")}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-red-500/50 outline-none hover:bg-red-500/90 text-bg"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleConfirm("no")}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-accent/50 outline-none hover:bg-accent text-bg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};
