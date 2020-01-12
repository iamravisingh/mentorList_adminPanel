const mongoose = require("mongoose");
require("./EmployeeModel");

mongoose.connect(
  "mongodb+srv://iamravisingh:tatabyebye@cluster0-2uaj0.mongodb.net/test",
  { useNewUrlParser: true },
  err => {
    if (!err) {
      console.log("Connection established successfully");
    } else {
      console.log("Error while connection DB " + err);
    }
  }
);
