import { useState } from 'react';

import { CornerDownLeft } from 'lucide-react';

export const NlpInterface = () => {
  const [text, setText] = useState("");
  const [btnA, setBtnA] = useState("Swap [Course A] and [Course B]");
  const [btnB, setBtnB] = useState("Assign [Lecturer] and [Course]");
  const [btnC, setBtnC] = useState("Cancel all sessions for [Date]");

  const handleChange = (e) => {
    const input = e.target.value;
    setText(input);
  };

  return (
    <div className="lg:max-w-[563px] h-fit p-4 flex flex-col gap-4 rounded-md border border-[#BDC8D1] bg-[#FFFFFF]">
      <div className="flex flex-wrap  items-left gap-4 justify-between lg:items-center">
        <p className="text-[#0B1C30] font-inter font-semibold text-base leading-6">
          Instruction Input
        </p>
        <div className="flex max-w-fit gap-2 text-center items-center px-3 py-2 bg-[#EFF4FF] border border-[#BDC8D1]">
          <span className=" w-2 h-2 rounded-full bg-accent"></span>
          <p className="font-inter whitespace-nowrap text-center font-bold text-xs leading-4 text-accent uppercase">
            GEMINI NLP PARSER ACTIVE
          </p>
        </div>
      </div>
      <div className="relative w-full lg:max-w-[503.33px] max-h-[246px] pb-2">
        <textarea
          id="bio"
          value={text}
          onChange={handleChange}
          rows={5}
          cols={40}
          placeholder="Move CSC301 from Day 2 Morning to Day 5 Afternoon due to venue availabilty conflict."
          className="resize-none w-full lg:max-w-[503.33px] max-h-[240px] bg-[#F8F9FF] border border-[#BDC8D1] text-[#0B1C30] outline-none px-5 pt-4.5 pb-9 placeholder:jetbrainsmono placeholder:font-medium placeolder:text-sm placeholder:leading-5.5 placeholder:text-[#0B1C30]  jetbrainsmono font-medium text-sm leading-5.5 text-[#0B1C30]  jetbrainsmono"
        />
        <div className="absolute bottom-5 right-2 flex items-center gap-1">
          <CornerDownLeft className="w-3 h-3 text-[#6E7881]" />
          <p className="font-inter regular text-sm leading-5 text-[#6E7881]">
            {" "}
            Press Ctrl+Enter to parse{" "}
          </p>
        </div>
      </div>
      <div className="w-full lg:max-w-[503.33px] sm:pt-6">
        <p className="text-[#565E74] font-inter font-bold text-xs leading-4 mb-3">
          Suggested Operation
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setText(btnA)}
            className="px-3 py-2 max-w-[242px] cursor-pointer text-center bg-[#F8F9FF] border border-[#BDC8D1] text-sm font-medium leading-4 text-[#565E74] jetbrainsmono"
          >
            Swap [Course A] and [Course B]
          </button>
          <button
            onClick={() => setText(btnB)}
            className="px-3 py-2 max-w-[242px] cursor-pointer text-center bg-[#F8F9FF] border border-[#BDC8D1] text-sm font-medium leading-4 text-[#565E74] jetbrainsmono"
          >
            Assign [Lecturer] and [Course]
          </button>
          <button
            onClick={() => setText(btnC)}
            className="px-3 py-2 max-w-[242px] cursor-pointer text-center bg-[#F8F9FF] border border-[#BDC8D1] text-sm font-medium leading-4 text-[#565E74] jetbrainsmono"
          >
            Cancel all sessions for [Date]
          </button>
        </div>
      </div>
    </div>
  );
};
