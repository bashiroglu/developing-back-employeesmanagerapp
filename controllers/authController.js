const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const AsyncCatch = require('../utils/AsyncCatch');

const signup = AsyncCatch(async (req, res, next) => {
  const { email, name, password } = req.body;

  let existingUser;

  existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return next(new AppError('This user is exist', 400));
  }

  let hashedPassword;

  hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });
  await newUser.save();
  if (!newUser) {
    return next(new AppError('could not save to db ', 400));
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
    return next(new AppError('problem with token ', 400));
  }

  res.status(201).json({
    userId: newUser.id,
    email: newUser.email,
    token: token
  });
});

exports.signup = signup;
exports.login = login;
