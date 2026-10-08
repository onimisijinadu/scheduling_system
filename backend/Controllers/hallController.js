const pool = require("../config/database");

const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getAllHalls = asyncErrorHandler(async (req, res, next) => {
  const halls = await pool.query("SELECT * FROM halls ORDER BY id ASC");
  res.status(200).json({
    status: "success",
    data: {
      halls: halls.rows,
    },
  });
});

exports.getHallById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const hall = await pool.query(
    `SELECT * FROM halls WHERE id=$1 ORDER BY id ASC`,
    [id],
  );

  res.status(200).json({
    status: "success",
    data: {
      hall: hall.rows[0],
    },
  });
});

exports.createHalls = asyncErrorHandler(async (req, res, next) => {
  const newHall = req.body.halls !== undefined ? req.body.halls : req.body;

  if (!newHall || (Array.isArray(newHall) && newHall.length === 0)) {
    const err = new customError("No data found", 400);
    return next(err);
  }

  // check if the and array of data or just a single data;

  const halls = Array.isArray(newHall) ? newHall : [newHall];

  const values = [];

  const valuesPlaceholder = halls.map((hall, index) => {
    const offset = index * 6;

    values.push(
      hall.hall_name,
      hall.exam_capacity,
      hall.total_seats,
      hall.hall_code,
      hall.status,
      hall.hall_location,
    );

    return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6})`;
  });

  const query = `INSERT INTO halls(hall_name, exam_capacity, total_seats, hall_code, status, hall_location ) VALUES${valuesPlaceholder.join(", ")} RETURNING *`;

  const result = await pool.query(query, values);

  res.status(200).json({
    status: "success",
    message: "hall created successfully...",
    data: {
      halls: result.rows.length == 1 ? result.rows[0] : result.rows,
    },
  });
});

exports.updateHall = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body.halls || req.body.hall || req.body;
  const {
    hall_name,
    exam_capacity,
    total_seats,
    hall_code,
    status,
    hall_location,
  } = data;

  // if (!hall_name || !exam_capacity || !total_seats || !hall_code || !status) {
  //   const err = new customError("Please provide hall name and capacity", 400);
  //   return next(err);
  // }

  const query = `UPDATE halls SET hall_name = $1, exam_capacity = $2, total_seats = $3, hall_code = $4, status = $5, hall_location = $6 WHERE id=$7 RETURNING *`;

  const values = [
    hall_name,
    exam_capacity,
    total_seats,
    hall_code,
    status,
    hall_location,
    id,
  ];

  const hall = await pool.query(query, values);

  if (hall.rows.length === 0) {
    return next(new customError("Hall not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "hall updated successfully",
    data: {
      hall: hall.rows[0],
    },
  });
});

exports.deleteHall = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const hall = await pool.query("DELETE FROM halls WHERE id=$1 RETURNING *", [
    id,
  ]);

  if (hall.rows.length == 0) {
    const err = new customError("Hall does not exist", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    message: "hall deleted successfully",
    data: {
      hall: null,
    },
  });
});
