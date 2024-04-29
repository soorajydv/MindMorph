const Joi = require('joi')


const courseReview = Joi.object({
    courseId: Joi.number().required(),
    userId: Joi.number().required(),
    description: Joi.string(),
    rating: Joi.number().required(),

})
const courseReviewReply = Joi.object({
    courseId: Joi.number(),
    userId: Joi.number().required(),
    description: Joi.string(),
    idCourseReview: Joi.number()

})

module.exports = { courseReview, courseReviewReply }