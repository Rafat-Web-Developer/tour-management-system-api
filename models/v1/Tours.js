const mongoose = require("mongoose");

const toursSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
      trim: true,
      unique: [true, "Name must be unique"],
      validate: {
        validator: (value) => {
          if (value === null) {
            return false;
          } else {
            return true;
          }
        },
      },
    },
    total_cost: {
      type: Number,
      require: [true, "Please provide a price"],
    },
    image: {
      type: String,
      require: [true, "Please provide a image url"],
    },
    address: {
      type: String,
      require: [true, "Please provide the location address"],
    },
    view_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Tours = mongoose.model("Tours", toursSchema);

module.exports = Tours;
