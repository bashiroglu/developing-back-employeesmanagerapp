const User = require('../models/user');

const signup = async (req, res, next) => {
  /*  {
    "equipments": ["t-shirt", "shoe"],
    "equipmentStatus": "full",
    "name": "Abdulla",
    "surname": "Bashir",
    "password": "12345",
    "username": "bashiroghlu",
    "groupname": "dec-2"
  } */
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      surname: req.body.surname,
      password: req.body.password,
      username: req.body.username,
      groupname: req.body.groupname,
      equipments: req.body.equipments,
      equipmentStatus: req.body.equipmentStatus
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
