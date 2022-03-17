const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const postRouter = require('./post');

router.get('/', (req, res) => {
  res.send('Hello world, this is index routes');
});

router.use('/auth', authRouter);
router.use('/posts', postRouter);

module.exports = router;
