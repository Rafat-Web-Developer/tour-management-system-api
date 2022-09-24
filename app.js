const express = require("express");
const cors = require("cors");
const HttpErrors = require("./models/v1/HttpErrors");
const toursRoute = require("./routes/v1/tours.route");

const app = express();

// all middleware
app.use(express.json());
app.use(cors());

// all routes middleware
app.use("/api/v1/tours", toursRoute);

// error handler for unknown route
app.use((req, res, next) => {
  const error = new HttpErrors("Route not found", 404);
  return next(error);
});

// error handler
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ success: false, message: error.message || "An unknown error" });
});

// Test route
app.get("/", (req, res) => {
  res.send("This testing route is working...");
});

module.exports = app;
