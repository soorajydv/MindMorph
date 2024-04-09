const bcrypt = require('bcrypt');
const { loginCredential } = require('../../validation/auth');
const prisma = require('../../../prisma/prisma');

module.exports = async (req, res) => {
  const { error, value } = loginCredential.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if a user with the  email exists
  const user = await prisma.user.findFirst({
    where: {
      email: value.email,
    },
  });
  if (!user) return res.status(400).json({ message: "Email doesn't exists" });

  // Now user with email exist so matching password
  const passwordMatch = await bcrypt.compare(value.password, user.password);
  if (!passwordMatch)
    return res.status(400).json({ message: 'Wrong Password' });

  // Both email & password are correct, now login user and send token as response
  res
    .status(200)
    .json({ message: 'Login Success', token: '8b2b42bc74444sg4238nc3c24' });
};
