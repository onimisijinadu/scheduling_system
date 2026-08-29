const pool = require("../config/database");

const customError = require("../utils/customError");

const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getAllDepartments = asyncErrorHandler(async (req, res, next) => {
  const departments = await pool.query(
    `SELECT * FROM departments ORDER BY id ASC`,
  );

  res.status(200).json({
    status: "success",
    data: {
      departments: departments.rows,
    },
  });
});

exports.getDepartmentById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const departments = await pool.query(
    `SELECT * FROM departments WHERE id=$1`,
    [id],
  );

  res.status(200).json({
    status: "success",
    data: {
      departments: departments.rows[0],
    },
  });
});

exports.createDepartments = asyncErrorHandler(async (req, res, next) => {
  const rawData = req.body.departments || req.body;

  if (!rawData || (Array.isArray(rawData) && rawData.length === 0)) {
    const err = new customError("Not data found", 400);
    return next(err);
  }

  const departments = Array.isArray(rawData) ? rawData : [rawData];

  const values = [];
  const palceholder = departments.map((department, index) => {
    const offset = index * 2;

    values.push(department.department_name, department.code);

    return `$${offset + 1}, $${offset + 2}`;
  });

  const query = `INSERT INTO departments(department_name, code) VALUES(${palceholder.join(", ")}) RETURNING *`;

  const result = await pool.query(query, values);

  res.status(200).json({
    status: "success",
    data: {
      departments: result.rows.length === 1 ? result.rows[0] : result.rows,
    },
  });
});

exports.updateDepartment = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const { department_name, code } = req.body;

  if (!department_name || !code) {
    const err = new customError("Please provide department name and code", 400);
    return next(err);
  }

  const query = `UPDATE departments SET department_name = $1, code = $2 WHERE id = $3 RETURNING *`;

  const values = [department_name, code, id];

  const departments = await pool.query(query, values);

  res.status(200).json({
    status: "success",
    message: "Updated Successfully!.",
    data: {
      departments: departments.rows[0],
    },
  });
});
exports.deleteDepartment = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const updatedDepartments = await pool.query(
    `DELETE FROM departments WHERE id=$1`,
    [id],
  );

  if (updatedDepartments.length == 0) {
    const err = new customError("Selected department does not exit", 400);

    return next(err);
  }

  res.status(200).json({
    status: "success",
    message: "Department deleted succesfully",
    data: {
      department: null,
    },
  });
});
