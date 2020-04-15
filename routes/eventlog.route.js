const express = require("express");
const app = express();
const eventlogRoute = express.Router();

let Eventlog = require("../model/eventlog");

//get eventlog
eventlogRoute.route("/").get((req, res, next) => {
  Eventlog.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//add to eventlog
eventlogRoute.route("/add").post((req, res, next) => {
  Eventlog.create(req.body, (error, logResponse) => {
    if (error) {
      return next(error);
    }
    res.json(logResponse);
  });
});

module.exports = eventlogRoute;
