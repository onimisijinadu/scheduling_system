import { useState } from 'react';

import { CoursesTable } from './components/CoursesTable';
import { HallsTable } from './components/HallsTable';
import { LecturersTable } from './components/LecturersTable';

export const CoursesPage = () => {
  const [selectedButton, setSelectedButton] = useState("courses");

  return (
    <div>
      <div className="flex border-b border-b-border w-full ">
        <button
          onClick={() => setSelectedButton("courses")}
          className={`${selectedButton === "courses" ? "text-accent border-b-3 border-b-accent" : "text-text "} px-2 pb-3 font-semibold font-sans text-base leading-6 cursor-pointer outline-none`}
        >
          Courses
        </button>
        <button
          onClick={() => setSelectedButton("halls")}
          className={`${selectedButton === "halls" ? "text-accent border-b-3 border-b-accent" : "text-text "} px-2 pb-3 font-semibold font-sans text-base leading-6 cursor-pointer outline-none`}
        >
          Halls & Venues
        </button>
        <button
          onClick={() => setSelectedButton("lecturers")}
          className={`${selectedButton === "lecturers" ? "text-accent border-b-3 border-b-accent" : "text-text "} px-2 pb-3 font-semibold font-sans text-base leading-6 cursor-pointer outline-none`}
        >
          Lecturers & Invigilators
        </button>
      </div>
      <div className="mt-6 w-full overflow-hidden">
        {selectedButton === "courses" && <CoursesTable />}
        {selectedButton === "halls" && <HallsTable />}
        {selectedButton === "lecturers" && <LecturersTable />}
      </div>
    </div>
  );
};
