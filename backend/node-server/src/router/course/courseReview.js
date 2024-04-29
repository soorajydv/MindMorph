const express = require('express')
const router = express.Router()

const { getCourseReviews, createCourseReview, courseReviewReply, deleteCourseReview } = require('../../controller/course/courseReview')

router.get('/', getCourseReviews)
router.post('/', createCourseReview)
router.post('/:id', courseReviewReply)
router.delete('/:id', deleteCourseReview)

module.exports = router 