const express = require('express');
const router = express.Router();
const { loginController, signupController } = require('../controller/auth');
const signup = require('../controller/signup');

router.post('/login', loginController);
router.post('/signup', signup);
//router.post('/course', courseController);

module.exports = router;
