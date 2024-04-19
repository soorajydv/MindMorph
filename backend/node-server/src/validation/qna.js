const Joi = require('joi');

const qna = Joi.object({
    userId: Joi.number().required(),
    courseId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    responseCount: Joi.number(),
    idQnA: Joi.number()

})
module.exports = { qna }