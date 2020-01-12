const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const Mentor = mongoose.model("mentorList");

router.get("/", function(req, res) {
  res.render("../views/mentor/addOrEdit.hbs", {
    viewTitle: "Insert mentors",
    style : 'main.css'
  });
});

router.post("/", function(req, res) {
  if (req.body._id === "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  const mentor = new Mentor();

  mentor.fullName = req.body.fullName;
  mentor.email = req.body.email;
  mentor.taskSummary = req.body.taskSummary,
  mentor.created_at = req.body.created_at
  mentor.estimatedTime = req.body.estimatedTime
  mentor.assigne = req.body.assigne
  mentor.mobile = req.body.mobile;
  mentor.city = req.body.city;
  
  mentor.save((err, docs) => {
    if (!err) {
      res.redirect("mentor/list");
    } else {
      if (err.name === "ValidationError") {
        handleValidationError(err, req.body);
        res.render("../views/mentor/addOrEdit.hbs", {
          viewTitle: "Insert mentor",
          mentor: req.body
        });
      } else {
        console.log("Error occured during record insertion : " + err);
      }
    }
  });
}

function updateRecord(req, res) {
  Mentor.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      console.log('arguments while uopdate >>>>>>>>.',arguments)
      if (!err) {
        res.redirect("mentor/list");
      } else {
        if (err.name === "ValidationError") {
          handleValidationError(err, req.body);
          res.render("mentor/addOrEdit", {
            viewTitle: "Update mentor",
            mentor: req.body,
            style : 'edit.css'
          });
        } else {
          console.log("Error during record update :" + err);
        }
      }
    }
  );
}

router.get("/list", function(req, res) {
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

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", function(req, res) {
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

router.get("/delete/:id", function(req, res) {
  Mentor.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/mentor/list")
    } else {
      console.log("Error in mentor delete : " + err);
    }
  });
});

module.exports = router;
