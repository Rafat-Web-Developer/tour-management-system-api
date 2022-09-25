const toursService = require("../../services/v1/tours.service");
const HttpErrors = require("../../models/v1/HttpErrors");

exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await toursService.getAllToursService();
    res.status(200).json({ success: true, data: tours });
  } catch (error) {
    next(new HttpErrors(error.message, 400));
  }
};

exports.getSingleTour = async (req, res, next) => {
  try {
    const tour = await toursService.getSingleTourService(req.params.id);

    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    next(new HttpErrors(error.message, 400));
  }
};

exports.createNewTour = async (req, res, next) => {
  try {
    const tour = await toursService.createNewTourService(req.body);

    res.status(200).json({
      success: true,
      message: "Tour added successfully",
      data: tour,
    });
  } catch (error) {
    next(new HttpErrors(error.message, 400));
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const result = await toursService.deleteTourService(req.params.id);

    if (!result.deletedCount) {
      return next(new HttpErrors("This tour is not delete"));
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
      data: result,
    });
  } catch (error) {
    next(new HttpErrors(error.message, 400));
  }
};
