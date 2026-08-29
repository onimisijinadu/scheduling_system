const pool = require("../config/database");

const customError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

exports.getAllHalls = asyncErrorHandler(async (req, res, next) => {
  const halls = await pool.query("SELECT * FROM halls");
  res.status(200).json({
    status: "success",
    data: {
      halls: halls.rows,
    },
  });
});

exports.getHallById = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  const hall = await pool.query(`SELECT * FROM halls WHERE id=$1`, [id]);

  res.status(200).json({
    status: "success",
    data: {
      hall: hall.rows[0],
    },
  });
});

exports.createHalls = asyncErrorHandler(async (req, res, next) => {
  const newHall = req.body || req.body.halls;

  if (!newHall || (Array.isArray(newHall) && newHall.length === 0)) {
    const err = new customError("No data found", 400);
    return next(err);
  }

  // check if the and array of data or just a single data;

  const halls = Array.isArray(newHall) ? newHall : [newHall];

  const values = [];

  const valuesPlaceholder = halls.map((hall, index) => {
    const offset = index * 3;

    values.push(hall.hall_name, hall.capacity, hall.id);

    return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
  });

  const query = `INSERT INTO halls(hall_name, capacity) VALUES${valuesPlaceholder.join(", ")} RETURNING *`;

  const result = await pool.query(query, values);

  res.status(200).json({
    status: "success",
    message: "hall created successfully...",
    data: {
      halls: result.rows.lenth == 1 ? result.rows[0] : result.rows,
    },
  });
});

exports.updateHall = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { hall_name, capacity } = req.body;

  if (!hall_name || !capacity) {
    const err = new customError("Please provide hall name and capacity", 400);
    return next(err);
  }

  const query = `UPDATE halls SET hall_name = $1, capacity = $2 WHERE id=$3 RETURNING *`;

  const values = [hall_name, capacity, id];

  const hall = await pool.query(query, values);

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
