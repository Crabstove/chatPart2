const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Eventlog = new Schema(
  {
    type: {
      type: String
    },
    user: {
      type: String
    },
    room: {
      type: String
    },
    date: {
      type: String
    },
    time: {
      type: String
    }
  },
  {
    collection: "eventLog"
  }
);

module.exports = mongoose.model("Eventlog", Eventlog);
