const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const Mentor = mongoose.model("mentorList");

module.exports = {
    insertRecord(req, res) {
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
            this.handleValidationError(err, req.body);
            res.render("../views/mentor/addOrEdit.hbs", {
              viewTitle: "Insert mentor",
              mentor: req.body
            });
          } else {
            console.log("Error occured during record insertion : " + err);
          }
        }
      });
    },
    updateRecord(req, res){
      Mentor.findOneAndUpdate({ _id: req.body._id },req.body,{ new: true },(err, doc) => {
          console.log('arguments while uopdate >>>>>>>>.',arguments)
          if (!err) {
            res.redirect("mentor/list");
          } else {
            if (err.name === "ValidationError") {
              this.handleValidationError(err, req.body);
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
    },
    handleValidationError(err, body){
      for (field in err.errors) {
        switch (err.errors[field].path){
          case "fullName":
            body["fullNameError"] = err.errors[field].message;
            break;
          case "email":
            body["emailError"] = err.errors[field].message;
            break;
          case "taskSummary":
            body["taskSummary"] = err.errors[field].message;
            break;
          case "created_at":
            body["created_at"] = err.errors[field].message;
            break;
          case "estimatedTime":
            body["estimatedTime"] = err.errors[field].message;
            break;
          case "mobile":
            body["mobile"] = err.errors[field].message;
            break;
          default:
            break;
        }
      }
    }
}