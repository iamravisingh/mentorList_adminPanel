const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const Mentor = mongoose.model("mentorList");
const mentorUtility = require('../utility/mentorUtility');


router.get("/", (req, res) => {
  res.render("../views/mentor/addOrEdit.hbs", {
    viewTitle: "Insert mentors",
    style : 'main.css'
  });
});

router.post("/", (req, res) => {
  if (req.body._id === "") {
    mentorUtility.insertRecord(req, res);
  } else {
    mentorUtility.updateRecord(req, res);
  }
});



router.get("/list",(req, res) => {
  Mentor.find((err, docs) => {
    if (!err) {
      res.render("mentor/list", {
        list: docs,
        style : 'list.css'
      });
    } else {
      console.log("Error in retrieving mentor list :" + err);
    }
  });
});



router.get("/:id", (req, res) => {
  Mentor.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("mentor/addOrEdit", {
        viewTitle: "Update mentor",
        mentor: doc,
        style: 'edit.css'
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Mentor.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/mentor/list")
    } else {
      console.log("Error in mentor delete : " + err);
    }
  });
});

module.exports = router;
