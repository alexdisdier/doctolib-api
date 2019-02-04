const express = require("express");
const bodyParser = require("body-parser");
const dateFns = require("date-fns");

const app = express(); // Initializing the server
app.use(bodyParser.json()); // This will enable us to obtain the params transmetted through the POST Method.

// Default json files to try the api.
const slotsTemplate = require("./slotsTemplate.json");

// Array in which we'll push the new bookings.
const booking = [];

////////////////////////
// ROUTES DECLARATION //
////////////////////////

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Welcome to the doctolib api");
});

// READ
// param query: date
app.get("/visits", (req, res) => {
  const checkDate = req.query.date;

  isPastNotSunday(req.query.date, res);

  if (checkDate) {
    for (let i = 0; i < booking.length; i++) {
      if (booking[i].date === checkDate) {
        return res.json(booking[i]);
      }
    }

    const newEntry = {
      date: checkDate,
      slots: {
        ...slotsTemplate
      }
    };

    booking.push(newEntry);

    res.json(newEntry);
  } else {
    res.status(400).json({
      message: "Bad Request",
      solution: "Try entering a query date in url"
    });
  }
});

// CREATE
// params body: date, slot, name
app.post("/visits/booking", (req, res) => {
  isPastNotSunday(req.body.date, res);

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
  const id = generateKey(20);

  if (checkDate && slot && name) {
    for (let i = 0; i < booking.length; i++) {
      if (booking[i].date === checkDate) {
        if (booking[i].slots[slot]["isAvailable"] === true) {
          const tempObj = {
            isAvailable: false,
            name: name,
            id: id
          };
          booking[i].slots[slot] = tempObj;
          return res.json(success);
        } else {
          return res.json(failure);
        }
      }
    }

    const newEntry = {
      date: checkDate,
      slots: {
        ...slotsTemplate
      }
    };

    newEntry.slots[slot] = {
      name: name,
      isAvailable: false,
      id: id
    };

    booking.push(newEntry);

    res.json(success);
  } else {
    res.status(400).json({
      message: "bad request",
      solution: "make sure you entered 3 body queries"
    });
  }
});

// CANCEL BOOKING
// params query: id
app.get("/visits/cancel", (req, res) => {
  const id = req.query.id;
  const success = {
    message: "Booking cancelled"
  };
  const failure = {
    error: {
      message: "No booking available with this id"
    }
  };

  if (id) {
    for (let i = 0; i < booking.length; i++) {
      for (let key in booking[i].slots) {
        if (booking[i].slots[key].id === id) {
          const tempObj = {
            isAvailable: true
          };
          booking[i].slots[key] = tempObj;
          return res.json(success);
        }
      }
    }
    return res.json(failure);
  } else {
    res.status(400).json({
      message: "bad request",
      solution: "no id submitted in url"
    });
  }
});

// === FUNCTIONS === //
const isPastNotSunday = (date, res) => {
  // Week starts on sunday which is 0. Saturday is 6.
  if (dateFns.isPast(date) || dateFns.getDay(date) === 0) {
    return res.status(400).json({
      message:
        "query dates have to be from today's date and cannot be on Sundays"
    });
  }
};

const generateKey = n => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

// Manage pages not found
app.all("*", function(req, res) {
  res.status(400).send("Page not found");
});

// Choosing the port to listen
app.listen(3000, () => {
  console.log("Server has started");
});
