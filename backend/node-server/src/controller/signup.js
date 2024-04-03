const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../models'); // Update the path based on your project structure

// console.log('User import: ', db);

// Joi schema for validation
const signupSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.number().integer().min(0).max(3).required(),
  avatar: Joi.string().uri(),
  birthdate: Joi.date().iso(),
});

// Express route for signup
router.post('/signup', async (req, res) => {
  // Extracting input parameters from request body
  const { fullName, email, password, role, avatar, birthdate } = req.body;

  // Validate input parameters using Joi
  const { error, value } = signupSchema.validate({
    fullName,
    email,
    password,
    role,
    avatar,
    birthdate,
  });

  // If validation fails, send an error response
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if a user with the same email already exists
  const existingUser = await db.User.findOne({
    where: {
      email: value.email,
    },
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ error: 'User with this email already exists' });
  }

  try {
    // Create a new user in the database using Sequelize
    const user = await db.User.create({
      fullName,
      email,
      password,
      role,
      avatar,
      birthdate,
    });

    // Send a success response with the created user object
    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error creating user:', error);
    // Handle database error and send a 500 (Internal Server Error) response
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
