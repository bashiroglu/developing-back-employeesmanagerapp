const Booking = require('../models/booking');
const GlobalError = require('../utils/GlobalError');

const getAllBookings = async (req, res, next) => {
  const { username } = req.params;
  let bookings;
  if (username) {
    try {
      bookings = await Booking.find({ username });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      bookings = await Booking.find();
    } catch (error) {
      console.log(error);
    }
  }
  if (!bookings) {
    return next(
      new GlobalError('We cound not find any bookings for this user', 400)
    );
  }

  res.status(200).json({ bookings });
};

const createBooking = async (req, res) => {
  const { shiftType, shoeSize, date, fullname, username, shift } = req.body;
  if (!shiftType && !shoeSize && !date && !fullname && !username && !shift) {
    return next();
  }

  let newBooking = new Booking({
    shiftType,
    shoeSize,
    date,
    fullname,
    username,
    shift
  });
  try {
    await newBooking.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({ booking: newBooking });
};

const deleteBooking = async (req, res, next) => {
  let booking;
  try {
    booking = await Booking.findByIdAndDelete(req.params.bookingId);
  } catch (error) {
    console.log(error);
  }
  if (!booking) {
    return next(new GlobalError('This booking is not exist', 400));
  }
  res.status(204).json({
    status: 'success',
    data: {
      data: null
    }
  });
};
exports.createBooking = createBooking;
exports.deleteBooking = deleteBooking;
exports.getAllBookings = getAllBookings;
