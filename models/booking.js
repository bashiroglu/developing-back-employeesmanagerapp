const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  shiftType: {
    type: String,
    required: [true, 'shiftType is required'],
    enum: ['12 hours', '8 hours']
  },

  date: {
    type: Date,
    required: [true, 'date is required']
  },
  fullname: {
    type: String,
    required: [true, 'fullname is required']
  },
  username: {
    type: String,
    required: [true, 'username is required']
  },
  shift: {
    type: String,
    enum: [
      '6:00-18:00',
      '18:00-6:00',
      '6:00-14:00',
      '14:00-22:00',
      '22:00-6:00'
    ],
    required: [true, 'shift is required']
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
