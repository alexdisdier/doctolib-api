const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // Initializing the server
app.use(bodyParser.json()); // This will enable us to obtain the params transmetted through the POST Method. 

// Default json files to try the api. 
const bookingModel = require('./bookingModel.json');

// Array in which we'll push the new bookings. 
const booking = [];

// ===== ROUTES ======= //

// http://localhost:3000/
app.get("/", (req, res) => {
  console.log('Hello homepage');
  res.send("Welcome to the doctolib api");
})

// http://localhost:3000/visits METHOD GET
app.get("/visits", (req, res) => {
  let checkDate = req.query.date;
  let defaultBooking = { ...bookingModel
  }; // make a copy of bookingModel
  if (booking.length === 0) {
    defaultBooking.date = checkDate;
    booking.push(defaultBooking);
  }
  for (let i = 0; i < booking.length; i++) {
    if (booking[i].date === checkDate) {
      return res.json(booking[i]);
    }
  }

  defaultBooking.date = checkDate;
  booking.push(defaultBooking);
  console.log('my booking array', booking);

  res.json(defaultBooking);
})

// http://localhost:3000/visits METHOD POST
app.post("/visits", (req, res) => {
  const checkDate = req.body.date;
  const slot = req.body.slot;
  const name = req.body.name;
  let defaultBooking = { ...bookingModel
  }; // make a copy of bookingModel

  const success = {
    "message": "Successfuly booked"
  };

  const failure = {
    "error": {
      "message": "Slot already booked"
    }
  };

  if (booking.length === 0) {
    defaultBooking.date = checkDate;
    defaultBooking.slots[slot]["isAvailable"] = false;
    defaultBooking.slots[slot].name = name;
    booking.push(defaultBooking);
    return res.json(success);
  }

  for (let i = 0; i < booking.length; i++) {
    if (booking[i].date === checkDate && booking[i].slots[slot]["isAvailable"] === true) {
      booking[i].slots[slot]["isAvailable"] = false;
      booking[i].slots[slot].name = name;
      return res.json(success);
    } else if (booking[i].date === checkDate && booking[i].slots[slot]["isAvailable"] === false) {
      return res.json(failure);
    }
  }

  return res.json(failure);

})

// ============= //

// Manage pages not found
app.all("*", function (req, res) {
  res.status(400).send('Page not found');
});

// Choosing the port to listen
app.listen(3000, () => {
  console.log("Server has started");
})