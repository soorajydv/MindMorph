const Joi = require('joi');

const createGameSchema = Joi.object({
    courseCategoryId: Joi.number().integer().required(),
    text: Joi.string().required(),
});

const updateGameByGameIdSchema = Joi.object({
    gameId: Joi.number().integer().required(),
    text: Joi.string().required(),
});

module.exports = { createGameSchema,updateGameByGameIdSchema };
