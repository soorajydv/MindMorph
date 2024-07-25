const Joi = require('joi');

const instructorAssignmentCreate = Joi.object({
  courseId: Joi.number().required(),
  title: Joi.string().required(),
  instruction: Joi.string(),
  deadline: Joi.date().iso(),
  points: Joi.number(),
  attachment:Joi.string(),
  instructorId:Joi.number().required()
});

const instructorAssignmentUpdate = Joi.object({
    assignmentId:Joi.number().required(),
    courseId: Joi.number(),
    title: Joi.string().required(),
    instruction: Joi.string(),
    deadline: Joi.date().iso(),
    points: Joi.number(),
    attachment:Joi.string()
  });

const returnAssignment = Joi.object({
  id:Joi.number().required(),
  points:Joi.number().required(),
  feedback:Joi.string()
})
module.exports = {instructorAssignmentCreate,instructorAssignmentUpdate,returnAssignment}