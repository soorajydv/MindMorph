const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token)
    return res
      .status(401)
      .json({ message: 'Access denied. Attach JWT in request Header' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ messae: 'Invalid token' });
  }
}

module.exports = verifyToken;
