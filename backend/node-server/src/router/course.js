const express = require('express');
const router = express.Router();
const {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controller/course/course');
const upload = require('../middleware/fileUpload');
const verifyToken = require('../middleware/verifyToken');

router.get('/:id', getCourse);
router.post('/', upload('courseThumbnail', 'thumbnail'), createCourse);
router.patch('/:id', upload('courseThumbnail', 'thumbnail'), updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
