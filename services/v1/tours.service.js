const Tours = require("../../models/v1/Tours");

exports.getAllToursService = async () => {
  const result = await Tours.find();
  return result;
};

exports.getSingleTourService = async (tourId) => {
  const result = await Tours.findByIdAndUpdate(
    tourId,
    {
      $inc: { view_count: 1 },
    },
    { new: true }
  );
  return result;
};

exports.getTopViewToursService = async () => {
  const result = await Tours.find().sort("-view_count").limit(3);
  return result;
};

exports.getTopCheapestToursService = async () => {
  const result = await Tours.find().sort("total_cost").limit(3);
  return result;
};

exports.createNewTourService = async (data) => {
  const result = await Tours.create(data);
  return result;
};

exports.updateSingleTourService = async (tourId, data) => {
  const result = await Tours.updateOne({ _id: tourId }, data, {
    runValidators: true,
  });
  return result;
};

exports.deleteTourService = async (tourId) => {
  const result = await Tours.deleteOne({ _id: tourId });
  return result;
};
