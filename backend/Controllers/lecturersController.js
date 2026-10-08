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
  l.lecturer_status,
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
    data: {
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
            l.lecturer_status,
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
    data: {
      lecturer: result.rows[0],
    },
  });
});

exports.createLecturer = AsyncErrorHandler(async (req, res, next) => {
  const data = req.body.lecturers !== undefined ? req.body.lecturers : req.body;

  const { user_id, department_id, lecturer_rank, invigilation_per_week } = data;

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
    data: {
      lecturers: (result.rows.length = 1 ? result.rows[0] : result.rows),
    },
  });
});

exports.updateLecturer = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const data = req.body.lecturers !== undefined ? req.body.lecturers : req.body;

  const {
    user_id,
    department_id,
    email,
    full_name,
    invigilation_per_week,
    lecturer_id,
    lecturer_rank,
    lecturer_status,
    assigned_courses,
  } = data;

  if (!user_id || !department_id || !lecturer_rank || !invigilation_per_week) {
    return next(
      new customError("user_id, department_id, and rank are required", 400),
    );
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const updateUser = `UPDATE users SET full_name = $1, email = $2 WHERE id = $3 RETURNING *`;

    const userValues = [full_name, email, user_id];

    const userResult = await client.query(updateUser, userValues);

    if (userResult.rows.length === 0) {
      return next(new customError("User not found", 404));
    }

    const updateLecturer = `UPDATE lecturers 
          SET 
              user_id = $1,
              department_id = $2,
              lecturer_rank = $3,
              invigilation_per_week = $4,
              lecturer_status = $5
          WHERE id = $6
          RETURNING *`;

    const lecturerValues = [
      user_id,
      department_id,
      lecturer_rank,
      invigilation_per_week,
      lecturer_status,
      lecturer_id,
    ];

    const result = await client.query(updateLecturer, lecturerValues);

    if (result.rows.length === 0) {
      return next(new customError("Lecturer not found", 404));
    }

    if (assigned_courses && assigned_courses.length > 0) {
      await client.query(
        "DELETE FROM course_lecturers WHERE lecturers_id = $1",
        [lecturer_id],
      );

      for (const course of assigned_courses) {
        // const { course_id, is_lead } = course;
        const courseId = course.course_id || course.id; // Use course_id if available, otherwise use id;
        const isLead = course.is_lead || false; // Default to false if is_lead is not provided;
        await client.query(
          `INSERT INTO course_lecturers (course_id, lecturers_id, is_lead) VALUES ($1, $2, $3)`,
          [courseId, lecturer_id, isLead],
        );
      }
    }

    await client.query("COMMIT");

    res.status(200).json({
      status: "Success",
      message: "Lecturer Successfully updated",
      data: {
        lecturers: result.rows[0],
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    return next(error);
  } finally {
    client.release();
  }
});

exports.deleteLecturer = AsyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const query = `DELETE FROM lecturers WHERE id = $1 RETURNING *`;

  const result = await pool.query(query, [id]);

  if (result.rowCount === 0) {
    return next(new customError("Lecturer not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: `Lecturer profile removed successfully`,
    data: null,
  });
});
