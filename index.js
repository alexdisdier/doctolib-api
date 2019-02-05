const express = require("express");
const app = express(); // Initializing the server
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({
  path: "variables.env"
});

const {
  DATABASE_NAME
} = process.env;

app.use(bodyParser.json()); // This will enable us to obtain the params transmetted through the POST Method.

/////////////////////////
// DATABASE CONNECTION //
/////////////////////////

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${DATABASE_NAME}`, {
  useNewUrlParser: true
})

////////////////////////
// MODEL DECLARATION //
////////////////////////
// Initialize the collections
// Mongoose will take into account these collections
require("./models/booking");

////////////////////////
// ROUTES DECLARATION //
////////////////////////

// HOMEPAGE
app.get('/', (req, res) => {
  res.send(`
    LINKS to other routes:
    1. View Schedule: /visits
    2. Book appointment: /visits/booking
    3. Cancel appointment: /visits/cancel
  `)
});

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send("Welcome to the doctolib api");
});

const visitsRoutes = require("./routes/visits");

// Active the routes
app.use(visitsRoutes);

/////////////////////
// STARTING SERVER //
/////////////////////

// Manage pages not found
app.all("*", function (req, res) {
  res.status(400).send("Page not found");
});

// Choosing the ports to listen depending if we are in production using Heroku or in Development mode
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});