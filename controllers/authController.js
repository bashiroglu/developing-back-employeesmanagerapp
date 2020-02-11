const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const GlobalError = require('../utils/GlobalError');
const AsyncCatch = require('../utils/AsyncCatch');

const signup = AsyncCatch(async (req, res, next) => {
  const {
    email,
    fullname,
    password,
    username,
    groupname,
    equipments
  } = req.body;

  let existingUser;

  existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new GlobalError('This user is exist', 400));
  }

  let hashedPassword;

  hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
    username,
    groupname,
    equipments,
    activeStatus: false
  });
  await newUser.save();
  if (!newUser) {
    return next(new GlobalError('could not save to db ', 400));
  }
  let token;
  token = jwt.sign(
    {
      userId: newUser.id,
      email: newUser.email
    },
    'donotsharewithanyone',
    { expiresIn: '1h' }
  );
  if (!token) {
    return next(new GlobalError('problem with token ', 400));
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    token: token,
    username,
    fullname,
    role: newUser.role
  });
});

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new GlobalError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new GlobalError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new GlobalError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new GlobalError(
      'Invalid credentials, could not log you in.',
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      'donotsharewithanyone',
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new GlobalError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    username: existingUser.username,
    fullname: existingUser.fullname,
    token: token,
    role: existingUser.role
  });
};
exports.signup = signup;
exports.login = login;
