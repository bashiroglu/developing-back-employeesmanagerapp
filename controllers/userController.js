const User = require('../models/user');
const employees = [
  {
    id: '1',
    name: 'Hasan',
    surname: 'Muradli',
    username: 'muradlihasan',
    groupname: 'groupname',
    equipmentStatus: 'equipmentStatus'
  },
  {
    id: '2',
    name: 'John',
    surname: 'Bottom',
    username: 'johnbottom',
    groupname: 'groupname',
    equipmentStatus: 'equipmentStatus'
  }
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (error) {}
  res.json({ users: users });
};

const createUser = (req, res, next) => {};

exports.getUsers = getUsers;
exports.createUser = createUser;
