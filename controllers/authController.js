const User = require('../models/user');

const createUser = async (req, res, next) => {
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

exports.createUser = createUser;
