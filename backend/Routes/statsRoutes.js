const express = require("express");

const router = express.Router();

const dashboardStarts = require("../Controllers/dashboardStarts");

router.route("/").get(dashboardStarts.Stats);

module.exports = router;
