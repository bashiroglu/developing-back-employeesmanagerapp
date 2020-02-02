const Booking = require('../models/booking');

const createBooking = async () => {
  const { shiftType, shoeSize, day, fullname, username, shift } = req.body;
  if (!shiftType && !shoeSize && !day && !fullname && !username && !shift) {
    return next();
  }

  try {
      
  } catch (error) {
    await Booking.createBooking({});
  }
};
module.exports = createBooking;
