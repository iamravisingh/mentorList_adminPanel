const mongoose = require("mongoose");
require("./mentorModel");
console.log('connercted to',process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true },err => {
    if (!err) {
      console.log("Connection established successfully");
    } else {
      console.log("Error while connection DB " + err);
    }
  }
);
