const express = require("express");
const toursController = require("../../controllers/v1/tours.controller");

const router = express.Router();

router.route("/tour/trending").get(toursController.getTopViewTours);
router.route("/tour/cheapest").get(toursController.getTopCheapestTours);

router
  .route("/")
  .get(toursController.getAllTours)
  .post(toursController.createNewTour);

router
  .route("/:id")
  .get(toursController.getSingleTour)
  .patch(toursController.updateSingleTour)
  .delete(toursController.deleteTour);

module.exports = router;
