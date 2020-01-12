const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    maxlength: [18, '3-18 charachters'],
    minlength: [3, '3-18 charachters']
  },
  surname: {
    type: String,
    required: [true, 'surname is required'],
    maxlength: [18, '3-18 charachters'],
    minlength: [3, '3-18 charachters']
  },
  username: {
    type: String,
    required: [true, 'username is required'],
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
  equipmentStatus: { type: Array, default: [] }
});

module.exports = mongoose.model('User', userSchema);
