const express = require("express");

const departmentController = require("../Controllers/departmentsController");

const router = express.Router();

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(departmentController.createDepartments);

router
  .route("/:id")
  .get(departmentController.getDepartmentById)
  .put(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
