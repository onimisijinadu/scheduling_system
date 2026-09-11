const DELTA = 1;

const buildPages = (page, totalPage) => {
  if (totalPage <= 1) return [1];

  const startRange = Math.max(2, page - DELTA);
  const endRange = Math.min(totalPage - 1, page + DELTA);
  const pages = [1];

  if (page > 2) pages.push("...");

  for (let i = startRange; i <= endRange; i++) pages.push(i);

  if (endRange < totalPage - 1) pages.push("...");
  pages.push(totalPage);

  return pages;
};

export const Pagination = ({ page, totalPage, onChange }) => {
  const Pages = buildPages(page, totalPage);

  const handleClick = (value) => {
    if (value < 1 || value === page || value > totalPage) return;
    onChange(value);
  };
  return (
    <div className="flex items-center gap-2 ">
      <button
        disabled={page === 1}
        onClick={() => handleClick(page - 1)}
        className={`px-3 py-1 bg-bg border border-border rounded-sm regular font-sans text-sm leading-5 disabled:text-text-h disabled:cursor-not-allowed text-text`}
      >
        Previous
      </button>
      <div className="flex items-center gap-2">
        {Pages.map((p, index) => {
          return p === "..." ? (
            <span
              key={index}
              aria-label="ellipse"
              className="  rounded-sm regular font-sans text-sm leading-5 text-text"
            >
              {p}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handleClick(p)}
              className={`${page === p ? "bg-accent text-bg" : "bg-bg border border-border  text-text"} cursor-pointer px-3 py-1  rounded-sm regular font-sans text-sm leading-5 `}
            >
              {p}
            </button>
          );
        })}
      </div>

      <button
        disabled={page === totalPage || totalPage === 0}
        onClick={() => handleClick(page + 1)}
        className={`px-3 py-1 bg-bg border border-border rounded-sm regular font-sans text-sm leading-5 disabled:text-text-h disabled:cursor-not-allowed text-text`}
      >
        Next
      </button>
    </div>
  );
};
