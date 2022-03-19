const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json({ success: false, message: 'Access token not found' });
  }

  try {
    const decode = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.ACCESS_TOKEN_SECRETE
    );
    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: 'Internal Server Error/Token invalid',
    });
  }
};

module.exports = verifyToken;
