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
import { Pagination } from '../../../component/Pagination';
import { SelectOptions } from '../../../component/selectOption';
import {
  Table,
  TableWrapper,
} from '../../../component/Table';
import { API_ENDPOINTS } from '../../../config/api';
import { useFetch } from '../../../fetch/useFetch';

export const HallsTable = () => {
  const {
    data: Halls,
    error,
    isLoading,
  } = useFetch(API_ENDPOINTS.HALLS, "halls");
  // console.log(courses);

  const [selectedRange, setSelectedRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // function to check for error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRange]);

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
          <Button className="flex  text-center items-center gap-1 bg-accent text-bg rounded-sm px-4 py-2 font-sans font-semibold text-sm leading-5 hover:backdrop:brightness-90 transition-colors">
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
                      <p
                        className={`flex items-center gap-2 font-sans text-semibold text-xs leading-4 px-3 py-2 rounded-full w-fit ${hall.status.toLowerCase() === "available" ? "text-[#15803D] bg-green-200" : "text-[#BE185D] bg-red-400/30"}`}
                      >
                        {hall.status.toLowerCase() === "available" ? (
                          <div className="rounded-full w-1.5 h-1.5 bg-green-400"></div>
                        ) : (
                          <div className="rounded-full w-1.5 h-1.5 bg-red-400"></div>
                        )}
                        {hall.status}
                      </p>
                    </td>

                    <td className="flex items-center gap-2 px-5 py-2 text-right">
                      <button
                        type="button"
                        className=" bg-slate-300 text-slate-500 hover:text-slate-400 font-bold p-2 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
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
  );
};
