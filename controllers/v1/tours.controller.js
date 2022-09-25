const toursService = require("../../services/v1/tours.service");
const HttpErrors = require("../../models/v1/HttpErrors");

exports.getAllTours = async (req, res, next) => {
  try {
    let filters = { ...req.query };

    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // console.log(filters);

    if (filtersString) {
      filters = JSON.parse(filtersString);
    }

    console.log(filters);

    const queries = {};

    if (req.query.sort) {
      // price,qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.limit) {
      queries.limit = parseInt(req.query.limit);
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query; // "3" "10"
      //50 products
      // each page 10 product
      //page 1--> 1-10
      //page 2--> 2-20
      //page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
      //page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
      //page 5--> 41-50

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await toursService.getAllToursService(filters, queries);
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

exports.getTopViewTours = async (req, res, next) => {
  try {
    const tours = await toursService.getTopViewToursService();

    res.status(200).json({
      success: true,
      data: tours,
    });
  } catch (error) {
    next(new HttpErrors(error.message, 400));
  }
};

exports.getTopCheapestTours = async (req, res, next) => {
  try {
    const tours = await toursService.getTopCheapestToursService();

    res.status(200).json({
      success: true,
      data: tours,
    });
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

exports.updateSingleTour = async (req, res, next) => {
  try {
    const tour = await toursService.updateSingleTourService(
      req.params.id,
      req.body
    );

    if (!tour.modifiedCount) {
      return next(new HttpErrors("This tour is not update"));
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
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
