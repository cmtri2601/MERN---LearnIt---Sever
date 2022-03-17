const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json({ success: false, message: 'Access token not found' });
  }

  try {
    const decode = jwt.verify(req.headers.authorization.split(' ')[1]);
    req.userId = decode.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: 'Token invalid' });
  }
};

module.exports = verifyToken;
