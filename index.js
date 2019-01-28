const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // Initializing the server

const booking = [];

// ===== ROUTES ======= //


//  http://localhost:3000/
app.get("/", (req, res) => {
  console.log('Hello homepage');
  res.send("Welcome to the doctolib api");
})

//  http://localhost:3000/visits
app.get("/visits", (req, res) => {
  console.log("Hello visits page");
  res.send("This is the visits page");
})