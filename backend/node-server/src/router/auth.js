const express = require('express');
const router = express.Router();
const {loginController, signupController} = require('../controller/auth')


router.post('/login', loginController);
router.post('/signup', signupController);
//router.post('/course', courseController);


module.exports = router;
 