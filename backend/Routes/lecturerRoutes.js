const express = require("express");

const router = express.Router();

const LecturersContoller = require("../Controllers/lecturersController");

router
  .route("/")
  .get(LecturersContoller.getAllLecturers)
  .post(LecturersContoller.createLecturer);

router
  .route("/:id")
  .get(LecturersContoller.getLecturerById)
  .put(LecturersContoller.updateLecturer)
  .delete(LecturersContoller.deleteLecturer);

module.exports = router;
