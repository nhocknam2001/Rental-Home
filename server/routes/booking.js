const router = require("express").Router();

const Booking = require("../models/Booking");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: err.message });
  }
});

// LISTING DETAILS BY ID
router.get("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const bookingDetail = await Booking.findById(bookingId).populate(
      "customerId listingId"
    );
    res.status(202).json(bookingDetail);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Booking detail can not found!", error: err.message });
  }
});

module.exports = router;
