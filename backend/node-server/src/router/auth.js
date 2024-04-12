const express = require('express');
const router = express.Router();

const signup = require('../controller/auth/signup');
const login = require('../controller/auth/login');
const upload = require('../middleware/fileUpload');

router.post('/signup', upload('userAvatar', 'avatar'), signup);
router.post('/login', login);

module.exports = router;
