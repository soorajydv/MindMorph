const express = require('express')
const router = express.Router()
const controller = require('../controller/instructorIncome/instructor.income')

router.get('/income/:id',controller.income)

module.exports = router
