////////////////////
// SCHEDULE MODEL //
////////////////////

const mongoose = require("mongoose");

const Schedule = mongoose.model("Schedule", {
  date: {
    type: date,
    default: new Date(),
    required: true
  },
  slots: {
    type: Object,
    required: true
  }
});

module.exports = Schedule;