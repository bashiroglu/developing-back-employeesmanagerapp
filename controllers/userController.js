const randomId = require('../utils/randomId');
const User = require('../models/user');
const GlobalError = require('../utils/GlobalError');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {}
  res.json({ users: users });
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
      groupname
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

exports.getUsers = getUsers;
exports.addUsers = addUsers;
