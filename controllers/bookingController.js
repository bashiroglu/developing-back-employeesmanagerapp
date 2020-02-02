const Booking = require('../models/booking');

const createBooking = async (req, res) => {
  const { shiftType, shoeSize, day, fullname, username, shift } = req.body;
  if (!shiftType && !shoeSize && !day && !fullname && !username && !shift) {
    return next();
  }

  let newBooking = new Booking({
    shiftType,
    shoeSize,
    day,
    fullname,
    username,
    shift
  });
  await newBooking.save();

  res.status(201).json({ booking: newBooking });
};

exports.createBooking = createBooking;
