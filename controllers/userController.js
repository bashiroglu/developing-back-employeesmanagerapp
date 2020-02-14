const randomId = require('../utils/randomId');
const User = require('../models/user');
const GlobalError = require('../utils/GlobalError');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {}
  res.json({ users });
};
const getInactiveUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ activeStatus: false }, '-password');
  } catch (error) {}
  res.json({ users });
};

const addUsers = async (req, res, next) => {
  console.log(req.body);

  const { users } = req.body;
  users.map(async user => {
    const { email, groupname, fullname } = user;
    let existingUser;

    existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new GlobalError('This user is exist', 400));
    }
    const password = randomId();

    const username = `${email.split('@')[0]}_${randomId()}`;
    let hashedPassword;

    hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      username,
      groupname,
      activeStatus: true
    });
    await newUser.save();

    console.log(email, groupname, fullname, password);
  });
  // let users;
  // try {
  //   users = await User.find({}, '-password');
  // } catch (error) {}
  res.json({ status: 'success' });
};
const activateUsers = async (req, res, next) => {
  console.log(req.body);

  const { userIds } = req.body;
  userIds.map(async userId => {
    let user;
    try {
      user = await User.findById(userId);
      user.activeStatus = true;
      user.save();
    } catch (error) {
      console.log(error);
    }
  });
  res.json({ status: 'success' });
};
const getUser = async (req, res, next) => {
  const { email } = req.params;
  // console.log(req.body.email);

  let user;
  try {
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }

  res.json({ status: 'success', user });
};
exports.getUsers = getUsers;
exports.getUser = getUser;
// exports.updateUser = updateUser;
exports.getInactiveUsers = getInactiveUsers;
exports.activateUsers = activateUsers;
exports.addUsers = addUsers;
