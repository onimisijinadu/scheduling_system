import { useEffect, useMemo, useState } from "react";

import { Edit2, PlusIcon, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "../../../component/Button";
import { FormInputs, FormWrapper, Modal } from "../../../component/Modal";
// import { Overlay } from '../../../component/Overly';
import { Overlay } from "../../../component/Overly";
import { Pagination } from "../../../component/Pagination";
import { SelectOptions } from "../../../component/selectOption";
import { Table, TableWrapper } from "../../../component/Table";
import { API_ENDPOINTS } from "../../../config/api";
import {
  PostRequest,
  useDeleteRequest,
  usePutRequest,
} from "../../../fetch/postRequest";
import { useFetch } from "../../../fetch/useFetch";

export const HallsTable = () => {
  // Get all halls
  const {
    data: Halls,
    error: getError,
    isLoading: gettingData,
    setData: setHalls,
  } = useFetch(API_ENDPOINTS.HALLS, "halls");
  // console.log(courses);

  // Add new hall
  const {
    postData: postHall,
    error: postError,
    isLoading: postIsLoading,
  } = PostRequest(API_ENDPOINTS.HALLS, "halls");

  // edit halls
  const {
    updateData: postUpdate,
    error: updateError,
    isLoading: updateLoading,
  } = usePutRequest(API_ENDPOINTS.HALLS, "halls");

  // delete hall
  const {
    deleteRecord: deleteHall,
    error: errorOnDelete,
    isLoading: deleting,
  } = useDeleteRequest(API_ENDPOINTS.HALLS, "halls");

  // initialForm State;
  const initialFormState = {
    hall_name: "",
    exam_capacity: "",
    total_seats: "",
    hall_code: "",
    status: "",
    hall_location: "",
  };

  const [selectedRange, setSelectedRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editingHallsId, setEditingHallsId] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);

  //function to filter course by department and levels
  const FilteredHalls = useMemo(() => {
    if (!Array.isArray(Halls)) return [];

    return Halls.filter((hall) => {
      const [min, max] = selectedRange.split("-").map(Number);

      const matchesRange =
        selectedRange === "all" ||
        (hall.exam_capacity >= min && hall.exam_capacity <= max);
      return matchesRange;
    });
  }, [Halls, selectedRange]);

  // function for display courses
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const DisplayHalls = FilteredHalls.slice(startIndex, endIndex);
  const totalPages = Math.ceil(FilteredHalls.length / itemsPerPage);

  const isLoading = updateLoading || deleting || postIsLoading || gettingData;
  // function to check for error
  useEffect(() => {
    const activeError = getError || updateError || errorOnDelete || postError;
    if (activeError) {
      toast.error(activeError);
    }
  }, [getError, updateError, errorOnDelete, postError]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRange]);

  const closeModal = () => {
    setIsOpen(false);
    setFormData(initialFormState);
    setEditingHallsId(null);
  };
  const handleAdd = () => {
    setEditingHallsId(null);
    setIsOpen(true);
    setFormData(initialFormState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingHallsId) {
        const res = await postUpdate(editingHallsId, "halls", formData);

        const updatedHall = res.data.halls || res.data.hall || res.halls;

        setHalls((prev) =>
          prev.map((h) =>
            h.id === editingHallsId ? { ...h, ...updatedHall } : h,
          ),
        );
        toast.success("Hall Succcessfully Updated!");
      } else {
        const res = await postHall("halls", formData);
        const newHall = res.data.halls || res.data.hall || res.data;
        setHalls((prev) => [newHall, ...prev]);
        toast.success("Hall Successfully Added");
      }
    } catch (err) {
      toast.error(err.message || "Failed to add course");
    } finally {
      setIsOpen(false);
    }
  };

  // const edit button
  const handleEdit = (hall) => {
    setEditingHallsId(hall.id);
    setFormData({
      hall_name: hall.hall_name || "",
      exam_capacity: Number(hall.exam_capacity) || "",
      total_seats: Number(hall.total_seats) || "",
      hall_code: hall.hall_code || "",
      status: hall.status || "",
      hall_location: hall.hall_location || "",
    });
    setIsOpen(true);
  };

  const handleConfirm = (response) => {
    if (response === "yes") {
      setConfirm(true);
      setIsConfirm(false);
    } else {
      setIsConfirm(false);
    }
  };

  const handleDelete = async (hall) => {
    setIsConfirm(true);
    if (!confirm) return;
    try {
      await deleteHall(hall.id, "halls");
      setHalls((prev) => prev.filter((h) => h.id !== hall.id));
      toast.success(`${hall.hall_name} deleted successfully`);
      setIsConfirm(false);
    } catch (err) {
      toast.error(err.message || "Failed to delete hall");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-accent" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col sm:flex-row  gap-4 w-full sm:justify-between  sm:items-center pb-4 my-2">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="py-2 px-4 rounded-sm border border-border bg-bg">
              <SelectOptions
                value={selectedRange}
                onChange={(e) => setSelectedRange(e.target.value)}
                className="font-sans w-full regular text-sm leading-5 text-text outline-none"
              >
                <option value="all">All Capacity Ranges</option>
                <option value="0-100">&lt; 100 Seats</option>
                <option value="100-300">100 - 300 Seats</option>
                <option value="300-600">300 - 600 Seats</option>
                <option value="600-1000">600 - 1000 Seats</option>
              </SelectOptions>
            </div>
          </div>
          <div className="flex text-center items-center">
            <Button
              onClick={handleAdd}
              className="flex  text-center items-center gap-1 bg-accent text-bg rounded-sm px-4 py-2 font-sans font-semibold text-sm leading-5 hover:backdrop:brightness-90 transition-colors"
            >
              <PlusIcon className="w-4 h-4" /> Add Venue
            </Button>
          </div>
        </div>
        {!isLoading && (
          <TableWrapper>
            <Table>
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-b-[#CBD5E1] text-left text-text-h font-sans font-bold text-xs leading-4 tracking-wide">
                  <td className="px-3 py-3 text-wrap whitespace-wrap">
                    VENUE CODE
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">VENUE NAME</td>
                  {/* <td className="px-4 py-3">TYPE</td> */}
                  <td className="px-4 py-3">EXAM CAPACITY</td>
                  <td className="px-4 py-3">TOTAL SEATS</td>
                  <td className="px-4 py-3 text-right">BUILDING/LOCATION</td>
                  <td className="px-4 py-3">STATUS</td>
                  <td className="px-4 py-3">ACTIONS</td>
                </tr>
              </thead>
              <tbody>
                {DisplayHalls.map((hall, index) => {
                  return (
                    <tr
                      key={hall.id}
                      className={`text-left ${DisplayHalls.length - 1 === index ? "" : "border-b border-b-border"}`}
                    >
                      <td className="px-4 py-2 text-text jetbrainsmono font-semibold text-xs leading-4">
                        {hall.hall_code}
                      </td>
                      <td className="px-4 py-2 text-text jetbrainsmono font-medium text-xs leading-4">
                        {hall.hall_name}
                      </td>
                      {/* <td className="px-4 py-2 font-sans font-medium text-sm leading-5 text-text">
                      {hall.hall_title}
                    </td> */}
                      <td
                        className={`px-4 py-2 text-center font-sans font-bold text-sm leading-5 text-text-h`}
                      >
                        {hall.exam_capacity}
                      </td>
                      <td className="px-4 py-2 text-center font-sans regular text-sm leading-5 text-text-h">
                        {hall.total_seats}
                      </td>
                      <td className="px-4 py-2 text-center jetbrainsmono font-medium text-xs leading-4 text-text">
                        {hall.hall_location}
                      </td>
                      <td className="px-4 py-2">
                        <div
                          className={`flex items-center gap-2 font-sans text-semibold text-xs leading-4 px-3 py-2 rounded-full w-fit ${hall.status.toLowerCase() === "available" ? "text-[#15803D] bg-green-200" : "text-[#BE185D] bg-red-400/30"}`}
                        >
                          {hall.status.toLowerCase() === "available" ? (
                            <div className="rounded-full w-1.5 h-1.5 bg-green-400"></div>
                          ) : (
                            <div className="rounded-full w-1.5 h-1.5 bg-red-400"></div>
                          )}
                          <span className="capitalize"> {hall.status} </span>
                        </div>
                      </td>

                      <td className="flex items-center gap-2 px-5 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => handleEdit(hall)}
                          className=" bg-slate-300 text-slate-500 hover:text-slate-400 font-bold p-2 rounded-lg cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(hall)}
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
            <div className="flex justify-between items-center whitespace-nowrap min-w-full w-full gap-4 py-3  px-4 bg-[#F8FAFC] border-t border-t-[#CBD5E1]">
              <div className="font-sans regular text-sm leading-5 text-text-h w-full">
                showing {FilteredHalls.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.ceil(endIndex, FilteredHalls.length)} of{" "}
                {FilteredHalls.length} entries
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
                label={"Hall Code"}
                id={"hall_code"}
                htmlFor={"hall_code"}
                name={"hall_code"}
                type={"text"}
                placeholder={"CIT"}
                value={formData.hall_code}
                onChange={handleChange}
              />
              <FormInputs
                label={"Hall Name"}
                id={"hall_name"}
                htmlFor={"hall_name"}
                name={"hall_name"}
                type={"text"}
                placeholder={"Introduction to Computer science"}
                value={formData.hall_name}
                onChange={handleChange}
              />

              <div className="flex items-center gap-4 w-full">
                <FormInputs
                  label={"Exam Capacity"}
                  id={"exam_capacity"}
                  htmlFor={"exam_capacity"}
                  name={"exam_capacity"}
                  type={"number"}
                  placeholder={"100"}
                  value={formData.exam_capacity}
                  onChange={handleChange}
                />
                <FormInputs
                  label={"Total Seats"}
                  id={"total_seats"}
                  htmlFor={"total_seats"}
                  name={"total_seats"}
                  type={"number"}
                  placeholder={"3"}
                  value={formData.total_seats}
                  onChange={handleChange}
                />
              </div>
              <FormInputs
                label={"Building / Location"}
                id={"hall_location"}
                htmlFor={"hall_location"}
                name={"hall_location"}
                type={"text"}
                placeholder={"Faculty of Science, Block B"}
                value={formData.hall_location}
                onChange={handleChange}
              />

              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="status"
                  className="text-xs font-bold text-slate-600"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="rounded border border-[#BDC8D1] bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-accent"
                >
                  <option value="">Select Status</option>
                  <option value="available">Available</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit">
                {editingHallsId ? "Update Course" : "Add Course"}
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
