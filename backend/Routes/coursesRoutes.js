const express = require("express");

const coursesController = require("../Controllers/coursesController");

const router = express.Router();

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(coursesController.createCourse);

router
  .route("/:id")
  .get(coursesController.getCourseById)
  .put(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
