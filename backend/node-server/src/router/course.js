const express = require('express');
const router = express.Router();
const { createCourse,updateCourse,deleteCourse } = require('../controller/course/course')
const upload = require('../middleware/fileUpload');

// router.post('/id',getCourse);
router.post('/',upload('courseThumbnail', 'thumbnail'),createCourse);
router.patch('/',updateCourse);
router.delete('/',deleteCourse);

module.exports = router;
