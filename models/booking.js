///////////////////
// BOOKING MODEL //
///////////////////

const mongoose = require("mongoose");

const Booking = mongoose.model("Booking", {
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
  // isAvailable: {
  //   type: Boolean,
  //   default: true,
  //   required: true
  // }
});

module.exports = Booking;