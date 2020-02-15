const randomId = require('../utils/randomId');
const User = require('../models/user');
const GlobalError = require('../utils/GlobalError');
const bcrypt = require('bcryptjs');
const Email = require('../utils/email');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (error) {}
  res.json({ users });
};
const getInactiveUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({ activeStatus: false });
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
      groupname: groupname ? groupname : 'main',
      activeStatus: true
    });
    await newUser.save();

    // new Email({
    //   password: password,
    //   fullname,
    //   email,
    //   groupname: newUser.groupname,
    //   username
    // }).send(`Welcome to our company ${fullname}`);
  });

  res.json({ status: 'success' });
};
const activateUsers = async (req, res, next) => {
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
const updateUser = async (req, res, next) => {
  const {
    email,
    fullname,
    username,
    groupname,
    shoesize,
    bodysize,
    emailForUpdate
  } = req.body;

  let user;
  try {
    // I could also use findbyid and update
    user = await User.findOne({ email });
  } catch (error) {
    console.log(error);
  }
  user.email = emailForUpdate ? emailForUpdate : user.email;
  user.fullname = fullname ? fullname : user.fullname;
  user.username = username ? username : user.username;
  user.groupname = groupname ? groupname : user.groupname;
  user.shoeSize = shoesize ? shoesize : user.shoesize;
  user.bodySize = bodysize ? bodysize : user.bodysize;
  user.save();
  res.json({ status: 'success', user });
};
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.getInactiveUsers = getInactiveUsers;
exports.activateUsers = activateUsers;
exports.addUsers = addUsers;
