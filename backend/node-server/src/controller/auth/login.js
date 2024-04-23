const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  // const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
  //   expiresIn: '1h',
  //   });
  // console.log('Value: ', value);
  jwt.sign(
    user,
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    function (err, token) {
      if (err) {
        console.log('Error: ', err);
        return res
          .status(400)
          .json({ message: 'failed to Generate token', error: err });
      }
      const userData = {
        fullName: user.fullName,
        email: user.email,
        userId: user.id,
        avatar: user.avatar,
        role: user.role,
token
      };
      return res
        .status(200)
        .json({ message: 'Login Success', userData });
    }
  );
};
