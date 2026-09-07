import { parseBlockDate } from '../../../utils/ParseDate';

const Sessions = [
  {
    id: 1,
    title: "Morning Block",
    exams_count: "24",
    venue_count: "17",
    date: "2026-05-14",
    time: "09:00-12:00",
  },
  {
    id: 2,
    title: "Afternoon Block",
    exams_count: 12,
    venue_count: 9,
    date: "2026-05-14",
    time: "14:00-17:00",
  },
  {
    id: 3,
    title: "Morning Block",
    exams_count: "31",
    venue_count: "22",
    date: "2026-05-15",
    time: "09:00-12:00",
  },
];
export const UpcomingSessions = () => {
  return (
    <div className="w-full ">
      <header className="flex justify-between items-center gap-4 pb-2">
        <p className="font-sans font-semibold text-base leading-6 text-text">
          Upcoming Sessions
        </p>
        <button className="cursor-pointer bg-none border-0 text-xs font-sans font-bold leading-4 tracking-[0.6px] text-[#00658D]">
          View All
        </button>
      </header>
      <div className="rounded-xs border border-border flex flex-col">
        {Sessions.map((item, index) => {
          const { month, day } = parseBlockDate(item.date);
          //   console.log(month, day);
          return (
            <div
              key={item.id}
              className={`flex gap-4 items-center text-center p-4 bg-bg  ${index === Sessions.length - 1 ? "" : "border-b border-b-border"}`}
            >
              <div className="flex flex-col jetbrainsmono font-medium text-xs leading-4 w-fit h-full px-3 py-1 bg-[#E5EEFF] border border-border">
                <span className="text-accent-text">{month}</span>
                <span className="text-text font-semibold leading-6 font-sans text-base ">
                  {day}
                </span>
              </div>
              <div className="text-left">
                <p className="font-sans font-bold text-sm leading-5 text-text">
                  {item.title} ({item.time})
                </p>
                <p className="font-sans regular text-sm leading-5 text-text-h">
                  {item.exams_count} Exams • {item.venue_count} Venues
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
