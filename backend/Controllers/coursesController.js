const pool = require("../config/database");
const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getAllCourses = asyncErrorHandler(async (req, res, next) => {
  // const courses = await pool.query("SELECT * FROM courses ORDER BY id ASC");
  const query = `
  SELECT 
    c.*,
    COALESCE(
      json_agg(
        json_build_object(
          'lecturer_id', l.id,
          'full_name', u.full_name,
          'rank', l.rank
        )
      ) FILTER (WHERE l.id IS NOT NULL),
      '[]'
    ) AS lecturers
  FROM courses c
  LEFT JOIN course_lecturers cl ON c.id = cl.course_id
  LEFT JOIN lecturers l ON cl.lecturer_id = l.id
  LEFT JOIN users u ON l.user_id = u.id
  GROUP BY c.id
  ORDER BY c.id ASC;
  `;

  const courses = await pool.query(query);

  res.status(200).json({
    status: "success",
    data: {
      courses: courses.rows,
    },
  });
});

exports.getCourseById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  // const course = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);

  const query = `
    SELECT c*, 
      COALESC(
        json_agg(
          json_build_object(  
            'lecturers_id','l.id',
            'full_name','u.full_name',
            'is_lead','cl.is_lead',
            'rank',''l.rank'
          )
        ) FILTER (WHERE l.id IS NOT NULL), 
         '[]'
      ) AS lecturers
    FROM courses c
    LEFT JOIN course_lecturers AS cl WHERE c.id = cl.course_id
    LEFT JOIN lectuers AS l WHERE l.id = cl.lecturers_id
    LEFT JOIN users AS u WHERE u.id = l.user_id
    WHERE id = $1
    GROUP BY c.id;
  `;

  const course = await pool.query(query, [id]);

  if (course.rows.length === 0) {
    const err = new customError("Course not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    data: {
      courses: course.rows[0],
    },
  });
});

exports.createCourse = asyncErrorHandler(async (req, res, next) => {
  const rawData = req.body.courses || req.body;

  if (!rawData || (Array.isArray(rawData) && rawData.length === 0)) {
    const err = new customError("No data found", 400);
    return next(err);
  }

  const courses = Array.isArray(rawData) ? rawData : [rawData];

  const values = [];

  const placeholder = courses.map((course, index) => {
    const offset = index * 6;

    values.push(
      course.course_code,
      course.course_title,
      course.course_level,
      course.course_unit,
      course.total_enrolled,
      course.department_id,
    );

    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
  });

  const query = `INSERT INTO courses(course_code, course_title, course_level, course_unit, total_enrolled, department_id ) VALUES${placeholder.join(", ")} RETURNING *`;

  const result = await pool.query(query, values);
  res.status(200).json({
    status: "Success",
    message: "courses created successfully!..",
    data: {
      courses: result.rows.length === 1 ? result.rows[0] : result.rows,
    },
  });
});

exports.updateCourse = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    course_code,
    course_title,
    course_level,
    course_unit,
    total_enrolled,
    department_id,
  } = req.body;

  const query = `UPDATE courses SET course_code = $1,
      course_title = $2,
      course_level = $3,
      course_unit = $4,
      total_enrolled = $5,
      department_id = $6
    WHERE id = $7 RETURNING *`;

  const values = [
    course_code,
    course_title,
    course_level,
    course_unit,
    total_enrolled,
    department_id,
    id,
  ];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    const err = new customError("Course not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    message: "Course updated successfully",
    data: {
      courses: result.rows[0],
    },
  });
});

exports.deleteCourse = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const result = await pool.query(
    "DELETE FROM courses WHERE id=$1 RETURNING *",
    [id],
  );

  if (result.rowCount === 0) {
    const err = new customError("Course not found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    message: "Course deleted successfully",
    data: {
      courses: null,
    },
  });
});

exports.assignLecturerToCourse = asyncErrorHandler(async (req, res, next) => {
  //The course ID comes from the URL endpoint: POST /api/courses/1/lecturers $\rightarrow$ req.params.id = 1.
  const { id: course_id } = req.params;

  const { lecturers_id, is_lead } = req.body;

  if (!lecturers_id) {
    const err = new customError("lecturers_id is required", 400);
    return next(err);
  }

  // If this lecturer is being marked as Lead, strip the lead title from any previous lecturer for this course
  if (is_lead) {
    await pool.query(
      "UPDATE course_lecturers SET is_lead = FALSE WHERE course_id = $1",
      [course_id],
    );
  }

  const query = `INSERT INTO 
                  course_lecturers(course_id, lecturers_id, is_lead) 
                  VALUES($1,$2,$3) 
                  ON CONFLICT (course_id, lecturers_id) 
                  DO UPDATE SET is_lead = EXCLUDED.is_lead
                  RETURNING *`;
  const values = [course_id, lecturers_id, is_lead];

  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return next(new customError("Not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Lecturer assigned successfully",
    body: {
      course_lecturers: result.rows[0],
    },
  });
});
exports.removeLectuer = asyncErrorHandler(async (req, res, next) => {
  const { id: course_id, lecturer_id: lecturers_id } = req.params;
  const query = `DELETE FROM course_lecturers WHERE id=$1 AND lecturers_id = $2 RETURNING *`;
  const values = [course_id, lecturers_id];
  const result = await pool.query(query, values);

  if (result.rows.length === 0) {
    return next(new customError("Lecturer not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Lecturer deleted successfully",
    body: null,
  });
});
