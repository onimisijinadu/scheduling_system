const { Pool } = require("pg");
const dotenv = require("dotenv");

// dotenv.config({
//   path: "../.env",
// });
const path = require("path"); // Added native utility

// Absolute path layout ensures your .env values load correctly from anywhere
dotenv.config({
  path: path.join(__dirname, "..", ".env"),
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => console.log(`Database connected..`))
  .catch((error) => console.log("Error: ", error.message));

module.exports = pool;
