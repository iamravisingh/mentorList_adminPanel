const mongoose = require("mongoose");

let mentorList = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field is required"
  },
  email: {
    type: String,
    required: "This field is required"
  },
  mobile: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    required: "This field is required"
  },
  taskSummary: {
    type: String,
    required: "This field is required"
  },
  created_at: {
    type: String,
    required: "This field is required"
  },
  assigne: {
    type: String,
    // required: "This field is required"
  },
  estimatedTime: {
    type: String,
    required: "This field is required"
  },
  city: {
    type: String,
    // required: "This field is required"
  }
});

mentorList.path("email").validate(val => {
  (emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    `Please fill valid email address`;
  return emailRegex.test(val);
}, "Invalid-email.");

mongoose.model("mentorList", mentorList);
