const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: [true, 'name is required'],
    maxlength: [18, '3-18 charachters'],
    minlength: [3, '3-18 charachters']
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
    maxlength: [18, '6-18 charachters'],
    minlength: [6, '6-18 charachters']
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
  groupname: { type: String },
  equipments: { type: Array, default: [] },
  equipmentStatus: { type: String, default: '' },
  role: { type: String, default: 'ordinary' }
});

module.exports = mongoose.model('User', userSchema);
