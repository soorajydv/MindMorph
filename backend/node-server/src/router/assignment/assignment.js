const express = require('express');
const router = express.Router();
const controller = require('../../controller/assignment/instructor')

router.get('/:id',controller.getCreatedAssignment)

module.exports = router