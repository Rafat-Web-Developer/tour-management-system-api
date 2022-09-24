const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("database connect successfully");
});

app.listen(port, () => {
  console.log(`Tour management server is working...`);
});
