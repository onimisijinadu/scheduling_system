export const TableWrapper = ({ children }) => {
  return (
    <div className="max-w-[calc(100vw-3rem)] sm:max-w-[calc(100vw-5rem)] overflow-hidden min-w-0 mx-auto rounded-lg border border-[#BDC8D1] bg-white">
      <div className="w-full overflow-x-auto [webkit-overflow-scrolling:touch]">
        {children}
      </div>
    </div>
  );
};

export const Table = ({ children }) => {
  return (
    <table className="bg-bg text-left gap-3 min-w-full table-auto h-fit">
      {children}
    </table>
  );
};
