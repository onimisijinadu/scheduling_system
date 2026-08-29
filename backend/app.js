const express = require("express");
const cors = require("cors");

const courserRoutes = require("./Routes/coursesRoutes");

const usersRoutes = require("./Routes/usersRoutes");
const globalErrorHandler = require("./Controllers/errorController");
const hallRoutes = require("./Routes/hallRoutes");
const departmentRoutes = require("./Routes/departmentRoutes");
const lecturerRoutes = require("./Routes/lecturerRoutes");
const customError = require("./utils/customError");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/v1/courses", courserRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/halls", hallRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/lecturers", lecturerRoutes);

// Node engine v5 replaces "*" with "{*path} "
app.all("{*path}", (req, res, next) => {
  const err = new customError("Page not found", 404);
  next(err);
});

app.use(globalErrorHandler);

module.exports = app;
