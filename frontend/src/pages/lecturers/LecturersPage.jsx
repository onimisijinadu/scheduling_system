import { DutiesTable } from './components/DutiesTable';
import { Header } from './components/LecturerHeader';
import { Profile } from './components/LecturerProfile';

const data = {
  full_name: "Prof. Abdullahi Musa",
  lecturer_rank: "Senior Lecturer",
  department_name: "Computer Science",
  invigilation_per_week: 3,
};

const schedule = [
  {
    course_id: 2,
    lecturer_id: 4,
    hall_id: 2,
    hall_name: "Twin Theatre",
    exam_capacity: 250,
    exam_date: "Oct 12, 2026",
    session_time: "08:30 AM - 11:30 AM",
    is_lead: true,
  },
  {
    course_id: 3,
    lecturer_id: 4,
    hall_id: 1,
    hall_name: "FCS Lab 1",
    exam_capacity: 50,
    exam_date: "Oct 14, 2026",
    session_time: "02:00 PM - 05:00 PM",
    is_lead: false,
  },
  {
    course_id: 4,
    lecturer_id: 4,
    hall_id: 3,
    hall_name: "Musa Abdullahi Auditorium",
    exam_capacity: 500,
    exam_date: "Oct 15, 2026",
    session_time: "08:30 AM - 11:30 AM",
    is_lead: true,
  },
  {
    course_id: 6,
    lecturer_id: 4,
    hall_id: 5,
    hall_name: "New Site Hall B",
    exam_capacity: 150,
    exam_date: "Oct 18, 2026",
    session_time: "11:30 AM - 02:30 PM",
    is_lead: false,
  },
  {
    course_id: 9,
    lecturer_id: 4,
    hall_id: 6,
    hall_name: "CIT",
    exam_capacity: 350,
    exam_date: "Oct 19, 2026",
    session_time: "08:30 AM - 11:30 AM",
    is_lead: false,
  },
  {
    course_id: 10,
    lecturer_id: 4,
    hall_id: 7,
    hall_name: "LRM",
    exam_capacity: 50,
    exam_date: "Oct 20, 2026",
    session_time: "02:00 PM - 3:00 PM",
    is_lead: false,
  },
];
export const LecturersPage = () => {
  return (
    <div className="flex flex-col gap-4 p-[20px] md:p-[32px] ">
      <Header activeUser={data} />
      <div className="flex flex-col justify-between md:flex-row gap-4">
        <Profile user={data} />
        <DutiesTable schedule={schedule} />
      </div>
    </div>
  );
};
