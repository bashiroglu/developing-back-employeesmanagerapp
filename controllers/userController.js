const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {}
  res.json({ users: users });
};



exports.getUsers = getUsers;

