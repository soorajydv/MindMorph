const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/pdfUpload')
const controller = require('../../controller/assignment/instructor')

router.post('',middleware('uploadAssignment','file'),controller.createAssignment);
router.get('/:instructorId',controller.getAssignments)
router.patch('',middleware('uploadAssignment','file'),controller.updateAssignment)
router.delete('/:id',controller.deleteAssignment)
router.patch('/return/:id',controller.returnAssignment)


module.exports = router