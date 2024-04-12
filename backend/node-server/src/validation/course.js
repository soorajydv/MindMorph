const Joi = require('joi');

const course = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  courseCategoryId:Joi.number().required(),
  description: Joi.string().min(10).max(1000).required(),
  objective: Joi.string().min(10).max(1000).required(),
  requirement:Joi.string().min(10).max(1000).required(),
  syllabus:Joi.string().min(20).max(10000).required(),
  language: Joi.string().valid('English','Nepali','Hindi').required(),
  price: Joi.number().min(0).max(50000).required(),
  discountPercent:Joi.number().min(0).max(100),
  rating: Joi.number().min(1).max(5),
  ratingCount:Joi.number().min(1),
  enrollCount:Joi.number().min(1),
  authorId: Joi.number().min(1),
  // thumbnail: Joi.string().uri().required(),
  subtitle: Joi.string(),
  titleVideo:Joi.string().uri()
});


const courseCategory = Joi.object({
    name: Joi.string().min(10).max(100).required(),
    courseDomainId: Joi.number().required(),
    courseId: Joi.number().required(),
  });
  

  const courseDomain = Joi.object({
    name: Joi.string().min(10).max(100).required()
  });

  module.exports = {course, courseCategory, courseDomain}