const pool = require("../config/database");
const AsyncErrorHandler = require("../utils/asyncErrorHandler");
const customError = require("../utils/customError");

exports.getAllLecturers = AsyncErrorHandler(async (req, res, next) => {
  const query = `SELECT 
  l.id AS lecturer_id,
  l.user_id,
  u.full_name,
  u.email,
  l.lecturer_rank,
  l.invigilation_per_week,
  d.id AS department_id,
  d.department_name,
  d.code AS department_code, COALESCE(
  json_agg(
  json_build_object(
  'course_id', c.id,
  'course_code', c.course_code,
  'course_title', c.course_title,
  'course_level', c.course_level,
  'is_lead', cl.is_lead
  )
  ) FILTER(WHERE c.id IS NOT NULL), '[]'
  ) AS assigned_courses
  FROM lecturers l
  JOIN users u ON l.user_id = u.id
  JOIN departments d ON l.department_id = d.id
  LEFT JOIN course_lecturers cl ON l.id = cl.lecturers_id
  LEFT JOIN courses c ON cl.course_id = c.id 
  GROUP BY l.id, u.id, d.id
  ORDER BY l.id ASC;
  `;

  const lecturers = await pool.query(query);

  res.status(200).json({
    status: "success",
    body: {
      lecturers: lecturers.rows,
    },
  });
});

exports.getLecturerById = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const query = `
        SELECT
            l.id AS lecturer_id,
            l.user_id,
            u.full_name,
            u.email,
            l.lecturer_rank,
            l.invigilation_per_week,
            d.id AS department_id,
            d.department_name,
            d.code AS department_code,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'course_id', c.id,
                            'course_title', c.course_title,
                            'course_level', c.course_level,
                            'is_lead', cl.is_lead
                        )
                    ) FILTER (WHERE c.id IS NOT NULL), '[]'
                )
            AS assigned_courses
            FROM lecturers l
            JOIN departments d ON d.id = l.department_id
            JOIN users u ON u.id = l.user_id
            LEFT JOIN course_lecturers cl ON l.id = cl.lecturers_id
            LEFT JOIN courses c ON cl.course_id = c.id
            WHERE l.id=$1
            GROUP BY l.id, u.id, d.id;
    `;

  const result = await pool.query(query, [id]);

  if (result.rows.length == 0) {
    const err = new customError("Lecturer not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    body: {
      lecturer: result.rows[0],
    },
  });
});

exports.createLecturer = AsyncErrorHandler(async (req, res, next) => {
  const { user_id, department_id, lecturer_rank, invigilation_per_week } =
    req.body;

  if (!user_id || !department_id || !lecturer_rank || !invigilation_per_week) {
    return next(
      new customError("user_id, department_id, and rank are required", 400),
    );
  }

  const query = `INSERT INTO lecturers(user_id, department_id, lecturer_rank, invigilation_per_week) VALUES($1,$2,$3,$4) RETURNING *`;

  const values = [user_id, department_id, lecturer_rank, invigilation_per_week];

  const result = await pool.query(query, values);

  res.status(200).json({
    status: "success",
    message: "Lecturer profile created successfully",
    body: {
      lecturers: (result.rows.length = 1 ? result.rows[0] : result.rows),
    },
  });
});

exports.updateLecturer = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { user_id, department_id, lecturer_rank, invigilation_per_week } =
    req.body;

  if (!user_id || !department_id || !lecturer_rank || !invigilation_per_week) {
    return next(
      new customError("user_id, department_id, and rank are required", 400),
    );
  }

  const query = `UPDATE lecturers 
        SET 
            user_id = $1,
            department_id = $2,
            lecturer_rank = $3,
            invigilation_per_week = $4,
            WHERE id = $5
        RETURNING *`;

  const values = [
    user_id,
    department_id,
    lecturer_rank,
    invigilation_per_week,
    id,
  ];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return next(new customError("Lecturer not found", 404));
  }

  res.status(200).json({
    status: "Success",
    message: "Lecturer Successfully updated",
    body: {
      lecturers: result.rows[0],
    },
  });
});

exports.deleteLecturer = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const query = `DELETE * FROM lecturers WHERE id = $1 RETURNING *`;

  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    return next(new customError("Lecturer not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: `Lecturer profile removed successfully`,
    body: null,
  });
});
