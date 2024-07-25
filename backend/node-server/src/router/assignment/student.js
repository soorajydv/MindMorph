const express = require('express');
const router = express.Router();
const controller = require('../../controller/assignment/student')
const middleware = require('../../middleware/pdfUpload')

router.get('/:enrolledCourseid',controller.getAllAssignments)
router.post('',middleware('submitAssignment','file'),controller.submitAssignment);
router.patch('',middleware('submitAssignment','file'),controller.updateAssignment)

module.exports = router