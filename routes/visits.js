////////////////////
// VISITS ROUTE //
////////////////////

const express = require("express");
const router = express.Router();
const dateFns = require("date-fns");

const Booking = require("../models/booking");
const ROUTE = "visits";

// Default json files to try the api.
const slotsTemplate = require("../slotsTemplate.json");

// Array in which we'll push the new bookings.
const booking = [];

// CREATE
// params body: date, slot, name
router.post(`/${ROUTE}/booking`, async (req, res) => {
  try {
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

    if (checkDate && slot && name) {
      for (let i = 0; i < booking.length; i++) {
        if (booking[i].date === checkDate) {
          if (booking[i].slots[slot]["isAvailable"] === true) {
            const newBooking = new Booking({
              date: checkDate,
              slot: slot,
              name: name,
              isAvailable: false
            });
            await newBooking.save();

            const tempObj = {
              isAvailable: false,
              name: name
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
        isAvailable: false
      };

      const newBooking = new Booking({
        date: checkDate,
        slot: slot,
        name: name,
        isAvailable: false
      });
      await newBooking.save();

      // modifyBooking(checkDate, newBooking, res);
      booking.push(newEntry);

      res.json(success);
    } else {
      res.status(400).json({
        message: "bad request",
        solution: "make sure you entered 3 body queries"
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// READ
// param query: date
router.get("/visits", async (req, res) => {
  try {
    const checkDate = req.query.date;
    const oldBooking = await Booking.find({
      date: checkDate
    });
    isPastNotSunday(req.query.date, res);

    if (checkDate) {
      modifyBooking(checkDate, oldBooking, res);
    } else {
      res.status(400).json({
        message: "Bad Request",
        solution: "Try entering a query date in url"
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// CANCEL BOOKING
// params query: id
router.get("/visits/cancel", async (req, res) => {
  try {
    const oldBooking = await Booking.findById(req.query.id);
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
          if (booking[i].date === oldBooking.date) {
            const tempObj = {
              isAvailable: true
            };
            booking[i].slots[key] = tempObj;
            return res.json(success);
          }
        }
      }

      await oldBooking.remove();
      return res.json(success);
    } else {
      res.status(400).json({
        message: "bad request",
        solution: "no id submitted in url or id does not exist"
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message
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

const modifyBooking = (checkDate, oldBooking, res) => {
  const slotsObject = { ...slotsTemplate };

  for (key in slotsObject) {
    for (let i = 0; i < oldBooking.length; i++) {
      if (key === oldBooking[i].slot) {
        slotsObject[key] = {
          name: oldBooking[i].name,
          isAvailable: false
        };
      }
    }
  }

  const newEntry = {
    date: checkDate,
    slots: slotsObject
  };
  booking.push(newEntry);
  return res.json(newEntry);
};

module.exports = router;
