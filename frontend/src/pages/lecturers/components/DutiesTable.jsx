import { useState } from 'react';

import {
  Calendar1,
  Clock1,
} from 'lucide-react';

import { Pagination } from '../../../component/Pagination';
import {
  Table,
  TableWrapper,
} from '../../../component/Table';
import { parseBlockDate } from '../../../utils/ParseDate';

export const DutiesTable = ({ schedule }) => {
  // course_id: 2, lecturer_id: 4, hall_id: 2,

  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const DisplayRoster = schedule.slice(startIndex, endIndex);
  const totalPages = Math.ceil(schedule.length / itemPerPage);

  return (
    <div className="max-w-[632.67px] lg:max-w-full">
      <TableWrapper>
        <div className="flex items-center justify-between gap-4 max-h-[57px] px-6 py-4 bg-[#F8F9FF] border-b border-[#BDC8D1]">
          <div className="flex items-center gap-2">
            <Calendar1 className="w-4 h-4 text-accent" />
            <p className="text-[#0B1C30] font-inter font-semibold text-base leading-6">
              My Upcoming Invigilation Duties
            </p>
          </div>
          {/* <div className="flex items-centermax-w-[65px] max-h-[20px]">
            <button
              onClick={() => setViewRange("all")}
              className={`${viewRange.toLowerCase() === "all" ? "hidden" : "block"} bg-none w-full h-full text-accent hover:text-accent/70 hover:bg-accent/20 hover:border border-accent/70 rounded-md cursor-pointer px-2 py-1 whitespace-nowrap text-center font-inter regular text-sm leading-5`}
            >
              View All
            </button>
            <button
              onClick={() => setViewRange("less")}
              className={`${viewRange.toLowerCase() === "all" ? "block" : "hidden"} bg-none w-full h-full text-accent hover:text-accent/70 hover:bg-accent/20 hover:border border-accent/70 rounded-md cursor-pointer px-2 py-1 whitespace-nowrap text-center font-inter regular text-sm leading-5`}
            >
              Show Less
            </button>
          </div> */}
        </div>
        <Table>
          <thead className="bg-[#F8F9FF] border-b border-[#BDC8D1]">
            <tr className="whitespace-nowrap text-xs leading-4 tarcking-[0.6px] font-inter font-medium text-[#6E7881]">
              <th className="px-4 py-3">Date & Day</th>
              <th className="px-4 py-3">Session Time</th>
              <th className="px-4 py-3">Assigned Hall</th>
              <th className="px-4 py-3">Capacity</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {DisplayRoster?.map((item, index) => {
              const role =
                item.is_lead === true
                  ? "Lead Invigilator"
                  : "Assistant Invigilator";

              const { month, day, year } = parseBlockDate(item.exam_date);
              return (
                <tr
                  key={index}
                  className="text-[#0B1C30] jetbrainsmono font-medium text-sm leading-5 text-left not-last:border-b border-[#BDC8D1] py-2"
                >
                  <td className="px-4 py-3.5 font-semibold text-[#0B1C30]">
                    {month} {day}, {year}
                  </td>
                  <td className="px-3 py-3.5 whitespace-wrap font-semibold flex items-center gap-1">
                    <Clock1 /> {item.session_time}
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-[#0B1C30]">
                    {item.hall_name}
                  </td>
                  <td className="px-4 py-3.5 text-center font-semibold text-[#0B1C30]">
                    {item.exam_capacity}
                  </td>
                  <td className={`px-4 py-3.5 font-semibold text-[#0B1C30] `}>
                    <p
                      className={`${item.is_lead === true ? "bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] px-2 py-1 rounded-xs " : "px-2 py-1 rounded-xs bg-[#E5EEFF] border border-[#BDC8D1] text-[#0B1C30]"}`}
                    >
                      {role}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="flex justify-between items-center whitespace-nowrap gap-4 py-3  px-4 bg-[#F8FAFC] border-t border-t-[#CBD5E1]">
          <div className="font-sans regular text-sm leading-5 text-text-h">
            showing {schedule.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.ceil(endIndex, schedule)} of {schedule.length} entries
          </div>
          <Pagination
            page={currentPage}
            totalPage={totalPages}
            onChange={(value) => setCurrentPage(value)}
          />
        </div>
      </TableWrapper>
    </div>
  );
};
