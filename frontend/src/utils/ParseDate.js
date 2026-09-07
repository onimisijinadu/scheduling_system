export const parseBlockDate = (dateString) => {
  if (!dateString) return { month: "---", day: "--" };

  // If it's only YYYY-MM-DD, append T00:00:00 to prevent timezone drift; otherwise parse as-is
  const formattedString =
    typeof dateString === "string" && dateString.length === 10
      ? `${dateString}T00:00:00`
      : dateString;

  const date = new Date(formattedString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return { month: "ERR", day: "!" };
  }

  const day = date.toLocaleDateString("en-US", { day: "2-digit" });

  const month = date
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

  return { month, day };
};

// export const parseBlockDate = (dateString) => {
//   // Append 'T00:00:00' to avoid UTC-midnight day shifting
//   const date = new Date(`${dateString}T00:00:00`);

//   const month = date
//     .toLocaleDateString("en-US", { month: "short" })
//     .toUpperCase();
//   const day = date.toLocaleDateString("en-US", { day: "2-digit" });

//   return { month, day };
// };

// export const parseBlockDate = (dateString) => {
//   if (!dateString) return { month: "---", day: "--" };

//   // Guard against ISO timestamp strings vs simple "YYYY-MM-DD"
//   const cleanString =
//     typeof dateString === "string" && dateString.length === 10
//       ? `${dateString}T00:00:00`
//       : dateString;

//   const date = new Date(cleanString);

//   if (isNaN(date.getTime())) {
//     return { month: "ERR", day: "!" };
//   }

//   const months = [
//     "JAN",
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//   ];

//   const month = months[date.getMonth()];
//   // Ensures two digits (e.g., "04", "14", "15")
//   const day = String(date.getDate()).padStart(2, "0");

//   return { month, day };
// };
