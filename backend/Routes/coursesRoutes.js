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

router.route("/:id/lecturers").post(coursesController.assignLecturerToCourse);

router
  .route("/:id/lecturers/:lecturer_id")
  .delete(coursesController.removeLectuer);

module.exports = router;
