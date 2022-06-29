const express = require("express");
const router = express.Router();
const trip = require("../models/Trips/tripDB");
const allTrips = require("../models/Trips/allTripsDB");

const bodyParser = require("body-parser");

router.use(bodyParser());

//Fetch Data

router.get("/trips", (req, res) => {
  trip.find({}, (err, trips) => {
    if (err) {
      res.send(err);
    }
    res.json(trips);
  });
});
router.get("/trips/user", (req, res) => {
  if (!req?.query?.phone) {
    return res.status(400).send("Phone number is required");
  }
  trip.find({ customerPhone: req?.query?.phone }, (err, trips) => {
    if (err) {
      res.send(err);
    }
    res.json(trips);
  });
});

router.get("/allTrips", (req, res) => {
  allTrips.find({}, (err, trips) => {
    if (err) {
      res.send(err);
    }
    res.json(trips);
  });
});

// ADD DATA
router.post("/trip", (req, res) => {
  console.log(req.body);

  let { driverPhone, customerPhone } = req.body;

  trip.create(
    {
      driverPhone,
      customerPhone,
    },
    (err, trip) => {
      if (err) return res.status(500).send("There was a problem adding the information to the database.");
      res.status(200).send(trip);
    }
  );
});

module.exports = router;
