const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // Initializing the server
app.use(bodyParser.json()); // This will enable us to obtain the params transmetted through the POST Method.

// Default json files to try the api.
const slotsTemplate = require("./slotsTemplate.json");

// Array in which we'll push the new bookings.
const booking = [];

// ===== ROUTES ======= //

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Welcome to the doctolib api");
});

// http://localhost:3000/visits METHOD GET
app.get("/visits", (req, res) => {
  const checkDate = req.query.date;

  for (let i = 0; i < booking.length; i++) {
    if (booking[i].date === checkDate) {
      return res.json(booking[i]);
    }
  }

  const newEntry = {
    date: checkDate,
    slots: { ...slotsTemplate
    }
  };

  booking.push(newEntry);

  res.json(newEntry);
});

// http://localhost:3000/visits METHOD POST
app.post("/visits", (req, res) => {
  const checkDate = req.body.date;
  const slot = req.body.slot;
  const name = req.body.name;
  const success = {
    message: "Successfuly booked"
  };
  const failure = {
    error: {
      message: "Slot already booked"
    }
  };

  for (let i = 0; i < booking.length; i++) {
    if (booking[i].date === checkDate) {
      if (booking[i].slots[slot]["isAvailable"] === true) {
        const tempObj = {
          isAvailable: false,
          name: name
        }
        booking[i].slots[slot] = tempObj;
        return res.json(success);
      } else {
        return res.json(failure);
      }
    }
  }

  const newEntry = {
    date: checkDate,
    slots: { ...slotsTemplate
    }
  };

  newEntry.slots[slot] = {
    name: name,
    isAvailable: false
  }

  booking.push(newEntry);

  res.json(success);
});

// ============= //

// Manage pages not found
app.all("*", function (req, res) {
  res.status(400).send("Page not found");
});

// Choosing the port to listen
app.listen(3000, () => {
  console.log("Server has started");
});