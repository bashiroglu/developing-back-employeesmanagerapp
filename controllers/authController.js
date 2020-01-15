const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email
      },
      'donotsharewithanyone',
      { expiresIn: '1h' }
    );
  } catch (error) {}

  try {
    res.status(201).json({
      userId: newUser.id,
      email: newUser.email,
      token: token
    });
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
