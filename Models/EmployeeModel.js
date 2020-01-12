const mongoose = require("mongoose");

let mentorList = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required"
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  taskSummary: {
    type: String
  },
  created_at: {
    type: String  
  },
  assigne: {
    type: String
  },
  estimatedTime: {
    type: String
  },
  city: {
    type: String
  }
});

// mentorList.path("email").validate(val => {
//   (emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
//     `Please fill valid email address`;
//   return emailRegex.test(val);
// }, "Invalid-email.");

mongoose.model("mentorList", mentorList);
