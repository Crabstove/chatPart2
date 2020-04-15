const express = require("express");
const adminRoute = express.Router();

let Eventlog = require("../model/eventlog");

//get admin page
adminRoute.route("/").get((req, res, next) => {
  res.render("admin")
});

module.exports = adminRoute;
