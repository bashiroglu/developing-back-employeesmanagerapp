const express = require('express');
const {
  createBooking,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.post('/', createBooking);
router.delete('/:bookingId', deleteBooking);

module.exports = router;
