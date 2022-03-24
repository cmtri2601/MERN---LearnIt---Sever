const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/auth');

const Post = require('../models/post');

//GET Posts - Private - /api/posts
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ postBy: req.userId }).populate(
      'postBy',
      'username'
    );
    return res.json({ success: true, message: '', posts });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Internal Server Error' });
  }
});

//POST Posts - Private - /api/posts
router.post('/', verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) return res.json({ success: false, message: 'Title is required' });

  try {
    const post = new Post({
      title,
      description: description || '',
      url: url ? (url.startsWith('https://') ? url : `https://${url}`) : '',
      status: status || 'TO LEARN',
      postBy: req.userId,
    });
    await post.save();
    res.json({ success: true, message: 'Happy Learing!', post: post });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Internal Server Error!' });
  }
});

//PUT Posts - Private - /api/posts/:id
router.put('/:id', verifyToken, async (req, res) => {
  const _id = req.params.id;
  const { title, description, url, status } = req.body;

  if (!title) return res.json({ success: false, message: 'Title is required' });

  try {
    const post = await Post.updateOne(
      { _id },
      {
        title,
        description: description || '',
        url: url ? (url.startsWith('https://') ? url : `https://${url}`) : '',
        status: status || 'TO LEARN',
      }
    );

    res.json({ success: true, message: 'Excellent process!', post });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Internal Server Error!' });
  }
});

//DELETE Posts - Private - /api/posts/:id
router.delete('/:id', verifyToken, async (req, res) => {
  const _id = req.params.id;
  try {
    await Post.deleteOne({ _id });
    res.json({ success: true, message: 'Delete course successfully!' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: 'Internal Server Error!' });
  }
});

module.exports = router;
