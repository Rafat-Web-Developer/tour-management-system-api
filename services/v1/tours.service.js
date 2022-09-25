const Tours = require("../../models/v1/Tours");

exports.getAllToursService = async () => {
  const result = await Tours.find();
  return result;
};

exports.createNewTourService = async (data) => {
  const result = await Tours.create(data);
  return result;
};

exports.deleteTourService = async (id) => {
  const result = await Tours.deleteOne({ _id: id });
  return result;
};
