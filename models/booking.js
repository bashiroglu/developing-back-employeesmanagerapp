const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  shiftType: {
    type: String,
    required: [true, 'shiftType is required'],
    enum: ['12 hours', '8 hours']
  },
  shoeSize: {
    type: String,
    enum: ['37', '38', '39', '40', '41', '42', '43', '44'],
    required: [true, 'shiftType is required']
  },
  day: {
    type: Date,
    required: [true, 'day is required']
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
    required: [true, 'shift is required']
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
