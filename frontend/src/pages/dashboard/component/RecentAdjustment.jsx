const Adjustment = [
  {
    id: 1,
    time_stamp: "08:42:11",
    entity: "CSC401",
    action: "Shifted from Hall A to Hall C (Capacity constraint)",
    source: "System (Greedy)",
  },
  {
    id: 2,
    time_stamp: "08:41:05",
    entity: "MTH202",
    action: "Invigilator unassined (Dr. Smith sick leave)",
    source: "Admin Override",
  },
  {
    id: 3,
    time_stamp: "08:35:59",
    entity: "ENG101",
    action: "Locked to Friday Morning slot",
    source: "NLP Command",
  },
  {
    id: 4,
    time_stamp: "08:30:00",
    entity: "Global",
    action: "Initiated full re-balance routine",
    source: "System Cron",
  },
];

export const RecentAdjustment = () => {
  return (
    <div className="w-full">
      <header className="pb-2">
        <p className="font-sans font-semibold text-base leading-6 text-text">
          Recent Algorithmic Adjustments
        </p>
      </header>
      <div className="w-full max-w-[calc(100vw-3rem)] mx-auto min-w-0 overflow-hidden rounded-lg border border-[#BDC8D1] bg-white">
        <div className="w-full overflow-x-auto [webkit-overflow-scrolling:touch]">
          <table class="table-auto bg-bg text-left gap-3 w-full">
            <thead className="bg-[#E5EEFF] text-sm font-semibold font-sans leading-4 tracking-wider">
              <tr>
                <th className="p-2">Timestamp</th>
                <th className="p-2">Entity</th>
                <th className="p-2">Action</th>
                <th className="p-2">Source</th>
              </tr>
            </thead>
            <tbody className="jetbrainsmono font-medium text-sm leading-4 text-text-h">
              {Adjustment.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index === Adjustment.length - 1 ? "" : "border-b border-b-border"}`}
                >
                  <td className="py-4 px-3">{item.time_stamp}</td>
                  <td className="py-4 px-3">{item.entity}</td>
                  <td className="py-4 px-3">{item.action}</td>
                  <td className="py-4 px-3">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="rounded-xs border border-border flex flex-col">
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
      </div> */}
    </div>
  );
};
