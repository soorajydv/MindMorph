const express = require('express')
const router = express.Router();

const controller = require('../controller/verifyCourse')

router.patch('/verify/:id',controller.verifyCourse)

module.exports = router