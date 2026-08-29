const pool = require("../config/database");

exports.createUser = async (req, res) => {
  try {
    const { id, full_name, email, password, role } = req.body;

    const query = `INSERT INTO users(id, full_name, email, password_hash, role) VALUES($1, $2, $3, $4, $5) RETURNING *`;

    const values = [id, full_name, email, password, role];

    const result = pool.query(query, values);

    res.status(200).json({
      status: "Success",
      message: "User Successfully created",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
