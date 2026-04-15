const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE BOOKING
router.post("/", async (req, res) => {
  const booking = await Booking.create(req.body);
  res.json(booking);
});

// GET BOOKINGS
router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;