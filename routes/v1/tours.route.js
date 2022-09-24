const express = require("express");
const toursController = require("../../controllers/v1/tours.controller");

const router = express.Router();

router.route("/").get(toursController.getAllTours);

module.exports = router;
