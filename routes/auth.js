const express = require('express');
const router = express.Router();

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../models/auth');

//test
router.get('/', async (req, res) => {
  res.send('Auth test');
});

//POST Resgiter - Public - /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  //Check if not found username and password
  if (!username || !password)
    return res.json({
      success: false,
      message: 'Missing username or/and password',
    });

  try {
    //Check if username exist in db
    const existUser = await User.findOne({ username: username });
    if (existUser) {
      return res.json({ success: false, message: 'Username is taken already' });
    }

    //Hash password
    const hashPassword = await argon2.hash(password);

    //Create new user
    const newUser = new User({
      username: username,
      password: hashPassword,
    });
    await newUser.save();

    res.json({ success: true, message: 'Register successfully' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
});

//POST Login - Public - /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  //Check if not found username and password
  if (!username || !password)
    return res.json({
      success: false,
      message: 'Missing username or/and password',
    });

  try {
    //Check if username exist in db
    const existUser = await User.findOne({ username: username });
    if (!existUser) {
      return res.json({
        success: false,
        message: 'Username or/and password are wrong 1',
      });
    }

    //Check password
    const checkPassword = await argon2.verify(existUser.password, password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: 'Username or/and password are wrong 2',
      });
    } else {
      const token = jwt.sign(
        { userId: existUser._id },
        process.env.ACCESS_TOKEN_SECRETE
      );
      res.json({ success: true, message: 'Login successfully', token });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
