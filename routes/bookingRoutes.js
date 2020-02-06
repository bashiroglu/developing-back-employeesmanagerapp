const express = require('express');
const {
  createBooking,
  deleteBooking,
  getAllBookings
} = require('../controllers/bookingController');

const router = express.Router();

router.get('/:username', getAllBookings);
router.post('/', createBooking);
router.delete('/:bookingId', deleteBooking);

module.exports = router;
