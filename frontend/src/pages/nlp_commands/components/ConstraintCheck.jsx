import {
  Braces,
  CheckCircle,
  Send,
  XCircle,
} from 'lucide-react';
import { toast } from 'react-toastify';

const data = {
  intent: "RELOCATE_SESSION",
  course_code: "CSC301",
  source_day: 2,
  source_session: "Morning",
  destination_day: 5,
  destination_session: "Afternoon",
  reason: "venue availability conflict",
};

const checkResult = [
  {
    title: "Venue Capacity Match",
    status: "Passed",
  },
  {
    title: "Lecturer Availability (Dr Sani)",
    status: "Passed",
  },
  {
    title: "Student Cohort Conflict",
    status: "Passed",
  },
];

export const ConstraintCheck = () => {
  return (
    <div className="flex flex-col gap-4 p-3 w-full lg:max-w-[540px] max-h-[716px] bg-[#FFFFFF] border border-[#BDC8D1] rounded-md">
      <div className="flex items-center gap-3 pb-4 border-b border-b-[#BDC8D1]">
        <Braces className="w-5 h-5 text-[#00658D]" />
        <p className="font-inter font-semibold text-base leading-6 text-[#0B1C30]">
          Parsed Parameter & Constraints
        </p>
      </div>
      {/* changes details */}
      <div className="max-h-[250px] pb-6">
        <div className="relative flex flex-col gap-3 max-h-[226px] p-4 bg-[#F8F9FF] border border-[#BDC8D1]">
          <div className="absolute left-0 h-full top-0 bg-[#00AEEF] w-2"></div>
          <p className="w-full text-[#00658D] jetbrainsmono font-medium text-xs sm:text-sm uppercase leading-4">
            <span className="w-[100px] text-[#565E74] sm:pr-7">INTENT:</span>{" "}
            {data.intent}
          </p>
          <p className="w-full text-[#0B1C30] jetbrainsmono font-medium text-xs sm:text-sm leading-4">
            <span className="w-[100px] text-[#565E74] sm:pr-7">TARGET:</span>{" "}
            {data.course_code}
          </p>
          <p className="w-full text-[#0B1C30] jetbrainsmono font-medium text-xs sm:text-sm leading-4 stripe">
            <span className="w-[100px] text-[#565E74] sm:pr-7">SOURCE:</span>{" "}
            <strike>
              Day {data.source_day}, {data.source_session}
            </strike>
          </p>
          <p className="w-full text-[#0B1C30] jetbrainsmono font-medium text-xs sm:text-sm leading-4">
            <span className="w-[100px] text-[#565E74] sm:pr-7">
              DESTINATION:
            </span>{" "}
            Day {data.destination_day}, {data.destination_session}
          </p>
          <p className="w-full text-[#0B1C30] jetbrainsmono font-medium text-xs sm:text-sm leading-4">
            <span className="w-[100px] text-[#565E74] sm:pr-7">REASON:</span> "
            {data.reason}"
          </p>
        </div>
      </div>
      {/* Gready Constraint Validation */}
      <div>
        <div className="max-w-[340.67px] max-h-[28px] pb-3 text-[#565E74]">
          <p className="font-inter font-bold text-xs sm:text-sm leading-4 tracking-[0.6px]">
            Greedy Constraint Validation
          </p>
        </div>
        <article className="flex flex-col gap-2 pb-7  border-b border-b-[#BDC8D1]">
          {checkResult.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between gap-3 items-center bg-[#F8F9FF] border border-[#BDC8D1] rounded-md p-3"
              >
                <div
                  className={`flex items-center gap-1 ${item.status?.toLowerCase() === "passed" ? "text-[#059669]" : "text-red/90"}`}
                >
                  {item.status?.toLowerCase() === "passed" ? (
                    <CheckCircle className="w-3 h-3 text-[#059669]" />
                  ) : (
                    <XCircle className="w-3 h-3 text-red/90" />
                  )}
                  <p className="font-inter regular text-sm leading-5 text-[#0B1C30]">
                    {item.title}
                  </p>
                </div>
                <p
                  className={`${item.status?.toLowerCase() === "passed" ? "text-[#059669] bg-[#D1FAE5]" : "text-red/90 bg-red/50 "} rounded-md px-2 py-1`}
                >
                  {item.status}
                </p>
              </div>
            );
          })}
        </article>
      </div>
      {/* button to confirm and apply */}
      <div className="w-full ">
        <button
          onClick={() => toast.success("Changes applied successfully!")}
          className="flex items-center justify-center bg-accent text-white py-3 px-4 rounded-md hover:bg-[#1A2C4A] focus:outline-none focus:ring-2 focus:ring-accents w-full"
        >
          <Send className="w-4 h-4 mr-2" /> Confirm & Apply
        </button>
      </div>
    </div>
  );
};
