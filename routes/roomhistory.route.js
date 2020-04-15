const express = require("express");
const app = express();
const historyRoute = express.Router();

let History = require("../model/history");

//get chat history of a specific room
historyRoute.route("/").post((req, res, next) => {
    console.log(req.body.roomname);
    var nameOfRoom = req.body.roomname;

  History.find({ room: nameOfRoom }, (err, doc) => {
    if (err) {
      return next(err);
    }
    res.json(doc);
  });
});


module.exports = historyRoute;
