const Joi = require('joi');

const user = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('STUDENT', 'INSTRUCTOR', 'ADMIN').required(),
  avatar: Joi.string().uri(),
  birthdate: Joi.date().iso(),
});

const loginCredential = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { user, loginCredential };
