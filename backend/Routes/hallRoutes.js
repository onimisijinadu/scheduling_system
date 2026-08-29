const express = require("express");

const router = express.Router();

const hallController = require("../Controllers/hallController");

router
  .route("/")
  .get(hallController.getAllHalls)
  .post(hallController.createHalls);

router
  .route("/:id")
  .get(hallController.getHallById)
  .put(hallController.updateHall)
  .delete(hallController.deleteHall);

module.exports = router;
