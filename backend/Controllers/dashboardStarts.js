const pool = require("../config/database");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.Stats = asyncErrorHandler(async (req, res, next) => {
  const query = `SELECT
  (SELECT COUNT(*) FROM courses) AS total_courses,
  (SELECT COUNT(*) FROM halls) AS total_venues,
  (SELECT COUNT(*) FROM invigilation_assignments) AS assigned_invigilation;`;
  // (SELECT COUNT(*) FROM exam_schedules WHERE has_conflict = true) AS total_conflicts;

  const result = await pool.query(query);

  res.status(200).json({
    status: "success",
    data: {
      stats: result.rows[0] || {
        total_courses: 0,
        total_venues: 0,
        assigned_invigilation: 0,
        total_conflicts: 0,
      },
    },
  });
});
