import { useState } from 'react';

import {
  Plus,
  Trash2,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { toast } from 'react-toastify';

import {
  FormInputs,
  FormWrapper,
  Modal,
} from '../../../component/Modal';
import { Overlay } from '../../../component/Overly';
import { API_ENDPOINTS } from '../../../config/api';
import {
  useDeleteRequest,
  usePutRequest,
} from '../../../fetch/postRequest';

export const LecturerModal = ({
  lecturerId,
  close,
  Lecturers,
  setLecturers,
  allCourses,
  allDepartments,
}) => {
  if (!lecturerId) return;

  // update lecturer details
  const {
    updateData: updateData,
    isLoading: updatingData,
    error: UpdateError,
  } = usePutRequest(API_ENDPOINTS.LECTURERS, "lecturers");

  //delete lecturer
  const {
    deleteRecord: deleteData,
    error: errorOnDelete,
    isLoading: deletingData,
  } = useDeleteRequest(API_ENDPOINTS.LECTURERS, "lecturers");

  const [isConfirm, setIsConfirm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCourseToAdd, setSelectedCourseToAdd] = useState("");

  // 3. Find active user safely
  const activeUser = Lecturers.find((user) => user.lecturer_id === lecturerId);

  if (!activeUser) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl w-full gap-4">
        <p className="text-sm text-[#3C4A46]">Lecturer not found.</p>
        <button
          onClick={close}
          className="px-4 py-2 bg-gray-200 rounded-lg text-xs"
        >
          Close
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    department_code: activeUser.department_code || "",
    department_id: activeUser.department_id || "",
    department_name: activeUser.department_name || "",
    email: activeUser.email || "",
    full_name: activeUser.full_name || "",
    invigilation_per_week: activeUser.invigilation_per_week || "",
    lecturer_id: activeUser.lecturer_id || "",
    lecturer_rank: activeUser.lecturer_rank || "",
    lecturer_status: activeUser.lecturer_status || "",
    user_id: activeUser.user_id || "",
    assigned_courses: activeUser.assigned_courses || [],
  });

  const fullName = activeUser.full_name;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateData(lecturerId, "lecturers", formData);

      const result = response.data.lecturers || response.data;

      setLecturers((prev) =>
        prev.map((c) =>
          (c.id ?? c.lecturer_id) === lecturerId ? { ...c, ...result } : c,
        ),
      );
      if (typeof close === "function") close();
      toast.success("Lecturer details updated successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setEdit(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    setIsConfirm(true);
  };

  const handleConfirm = async (message) => {
    if (message === "yes") {
      try {
        await deleteData(lecturerId);
        setLecturers((prev) =>
          prev.filter((c) => (c.id ?? c.lecturer_id) !== lecturerId),
        );
        if (typeof close === "function") close();
        toast.success(`${activeUser.full_name} deleted successfully!`);
      } catch (error) {
        toast.error(error || "Failed to remove lecturer.");
      }
    }
    setIsConfirm(false);
  };

  // function to assign courses to lecturers

  const handleAddCourseFromDb = () => {
    if (!selectedCourseToAdd) return;

    const courseObj = allCourses.find(
      (c) => Number(c.id ?? c.course_id) === Number(selectedCourseToAdd),
    );

    if (!courseObj) return;

    const courseId = Number(courseObj.id ?? courseObj.course_id);

    const alreadyAssigned = formData.assigned_courses?.some(
      (c) => Number(c.id ?? c.course_id) === courseId,
    );

    if (alreadyAssigned) {
      toast.warning("Course is already assigned to this lecturer.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      assigned_courses: [...prevData.assigned_courses, courseObj],
    }));

    setSelectedCourseToAdd("");
  };
  const handleRemoveCourse = async (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      assigned_courses: prev.assigned_courses.filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };

  return (
    <>
      {!edit ? (
        <div className="flex flex-col items-center h-fit w-full overflow-y-auto max-h-[80vh] overflow-[webkit-scrollbar] scrollbar-thin scroll-auto ">
          {" "}
          <header className="max-h-[79px] w-full border-b border-b-[#BBCAC4] flex justify-between p-2 items-center gap-4">
            <p className=" font-semibold text-lg leading-6.4 text-[#161D1B] min-w-[200px]">
              Lecturer Details
            </p>

            <span>
              <XIcon onClick={close} className="h-5 w-5 text-[#161D1B]" />
            </span>
          </header>
          <section className="top-[608px] w-full border-t border-t-[#BBCAC4] p-6 flex flex-col items-center gap-4">
            {/* user names, rank and status section */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-[96px] h-[96px] rounded-full border-4 border-border bg-[#E8F0EC]">
                <UserIcon className="w-[90px] h-[80px]" />
              </div>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-[#161D1B]  font-semibold textlg leading-6 text-center">
                  {fullName}
                </p>
                <p className=" font-medium text-sm text-[#3C4A46] leading-5 text-center">
                  {activeUser.lecturer_rank}
                </p>
                <div className="flex gap-1 items-center">
                  {activeUser.lecturer_status.toLowerCase() === "available" ? (
                    <div className="w-2 h-2 rounded-full bg-[#3DD598] mx-auto"></div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#FFDAD6] mx-auto"></div>
                  )}
                  <p className=" font-medium text-sm text-[#3C4A46] leading-5 text-center">
                    {activeUser.lecturer_status}
                  </p>
                </div>
                <div className="flex gap-4 p-4">
                  <button
                    onClick={() => setEdit(true)}
                    className="bg-accent/15 hover:bg-accent hover:text-white w-[106px] h-[28px] rounded-lg py-2 px-6 text-accent  font-semibold text-xs leading-3 text-center cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-[#FFDAD61A] hover:bg-red-600 hover:text-white w-[106px] h-[28px] rounded-lg py-2 px-6 text-[#BA1A1A]  font-semibold text-xs leading-3 text-center cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            {/* Assigned Courses */}
            <div className="flex flex-col gap-3 mt-3">
              <p className="text-[#3C4A46]  font-semibold text-xs leading-3 uppercase">
                Assigned Courses
              </p>
              <div className="flex flex-col gap-2 items-center">
                {activeUser.assigned_courses?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-2 w-full bg-contact-bg px-2 py-3 rounded-2xl"
                    >
                      <p className=" font-semibold text-sm leading-3  text-[#161D1B]">
                        {item.course_code}
                      </p>
                      <p className=" font-regular text-sm leading-3 text-[#3C4A46]">
                        {item.course_title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          {/* action button */}
        </div>
      ) : (
        /* Edit Form with Database Select Dropdowns */
        <FormWrapper
          handleSubmit={handleSubmit}
          className="flex flex-col items-center gap-3 h-fit w-full overflow-y-auto max-h-[80vh] overflow-[webkit-scrollbar] scrollbar-thin scroll-auto px-2"
        >
          <div className="flex justify-between items-center w-full border-b pb-2 mb-2 px-2">
            <p className="font-semibold text-base">Edit Lecturer Details</p>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className="text-xs text-gray-500 underline cursor-pointer"
            >
              Back
            </button>
          </div>

          <FormInputs
            label={"Full Name"}
            id={"full_name"}
            name={"full_name"}
            type={"text"}
            value={formData.full_name}
            onChange={handleChange}
          />
          <FormInputs
            label={"Email"}
            id={"email"}
            name={"email"}
            type={"email"}
            value={formData.email}
            onChange={handleChange}
          />

          {/* Department Select Dropdown from DB */}
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="department_id"
              className="text-xs font-bold text-slate-600"
            >
              Department
            </label>
            <select
              id="department_id"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="rounded border border-[#BDC8D1] bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-accent"
            >
              <option value="">Select Department</option>
              {Array.isArray(allDepartments) &&
                allDepartments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.department_name} — {dept.code}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex items-center gap-4 w-full">
            <FormInputs
              label={"Invigilation/Week"}
              id={"invigilation_per_week"}
              name={"invigilation_per_week"}
              type={"number"}
              value={formData.invigilation_per_week}
              onChange={handleChange}
            />
            <FormInputs
              label={"Academic Rank"}
              id={"lecturer_rank"}
              name={"lecturer_rank"}
              type={"text"}
              value={formData.lecturer_rank}
              onChange={handleChange}
            />
          </div>

          {/* Status Select */}
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="lecturer_status"
              className="text-xs font-bold text-slate-600"
            >
              Status
            </label>
            <select
              id="lecturer_status"
              name="lecturer_status"
              value={formData.lecturer_status}
              onChange={handleChange}
              className="rounded border border-[#BDC8D1] bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-accent"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          {/* Assign Courses from Database via Select Dropdown */}
          <div className="flex flex-col gap-2 w-full border-t pt-3 mt-2">
            <label className="text-xs font-bold text-slate-600 uppercase">
              Assign Courses
            </label>

            <div className="flex gap-2 items-center">
              <select
                value={selectedCourseToAdd}
                onChange={(e) => setSelectedCourseToAdd(e.target.value)}
                className="rounded border border-[#BDC8D1] bg-white px-3 py-2 text-sm text-slate-800 outline-none w-3/4"
              >
                <option value="">Select Course to Add</option>
                {Array.isArray(allCourses) &&
                  allCourses.map((c) => (
                    <option
                      key={c.id || c.course_id}
                      value={c.id || c.course_id}
                    >
                      {c.course_code} - {c.course_title}
                    </option>
                  ))}
              </select>
              <button
                type="button"
                onClick={handleAddCourseFromDb}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded text-xs font-semibold flex items-center gap-1 justify-center w-1/4 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {/* List of currently attached courses with delete buttons */}
            <div className="flex flex-col gap-2 max-h-36 overflow-y-auto mt-2">
              {formData.assigned_courses.map((course, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white border p-2 rounded text-xs"
                >
                  <div>
                    <span className="font-bold">{course.course_code}</span> -{" "}
                    {course.course_title}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(idx)}
                    className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-accent hover:bg-accent/65 text-white px-3 py-2 rounded text-sm font-semibold flex items-center gap-1 justify-center w-full mt-4 cursor-pointer"
          >
            Save Changes
          </button>
        </FormWrapper>
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
                Are you sure you want to delete this Lecturer?
              </p>
              <div className="flex gap-5 justify-center items-center w-full">
                <button
                  onClick={() => handleConfirm("yes")}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-red-500/50 outline-none hover:bg-red-500/90 text-bg whitespace-nowrap"
                >
                  Yes Delete
                </button>
                <button
                  onClick={() => handleConfirm("no")}
                  className="cursor-pointer px-4 py-2 rounded-lg bg-accent/50 outline-none hover:bg-accent text-bg whitespace-nowrap"
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



