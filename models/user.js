const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required'],
    maxlength: [28, '3-28 charachters'],
    minlength: [3, '3-28 charachters']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    maxlength: [28, '6-28 charachters'],
    minlength: [6, '6-28 charachters']
  },
  surname: {
    type: String,
    maxlength: [18, '3-18 charachters'],
    minlength: [3, '3-18 charachters']
  },
  username: {
    type: String,
    maxlength: [28, '6-28 charachters'],
    minlength: [6, '6-18 charachters']
  },
  activeStatus: {
    type: Boolean,
    required: [true, 'Active Status is required'],
    default: false
  },
  password: { type: String, required: true },
  passwordСonfirm: { type: String },
  imageUrl: { type: String },
  bookings: { type: String },
  bodySize: {
    type: String,
    enum: ['xs', 's', 'l', 'xl', 'xxl']
  },
  shoeSize: {
    type: String,
    enum: ['37', '38', '39', '40', '41', '42', '43', '44']
  },
  groupname: { type: String, required: true, default: 'main' },
  equipments: { type: Array, default: [] },
  equipmentStatus: { type: String, default: '' },
  role: { type: String, default: 'ordinary' }
});

module.exports = mongoose.model('User', userSchema);
