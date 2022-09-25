const express = require("express");
const toursController = require("../../controllers/v1/tours.controller");

const router = express.Router();

router
  .route("/")
  .get(toursController.getAllTours)
  .post(toursController.createNewTour);

router.route("/:id").delete(toursController.deleteTour);

module.exports = router;
