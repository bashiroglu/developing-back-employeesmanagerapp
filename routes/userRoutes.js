const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', userController.getUsers);
router.post('/signup', authController.createUser);

module.exports = router;
