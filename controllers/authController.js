const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  if (existingUser) {
    throw Error('this user already exist');
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
  }

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });
  
  try {
    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });
  } catch (error) {
    console.log(error);
  }
  try {
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password
    });

    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signup = signup;
exports.login = login;
