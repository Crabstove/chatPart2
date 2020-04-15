const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let History = new Schema(
  {
    user: {
      type: String
    },
    date: {
      type: String
    },
    time: {
      type: String
    },
    room: {
      type: String
    },
    message: {
      type: String
    }
  },
  {
    collection: "History"
  }
);

module.exports = mongoose.model("History", History);
