const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/inactive-users', userController.getInactiveUsers);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/signup-many', userController.addUsers);

module.exports = router;
