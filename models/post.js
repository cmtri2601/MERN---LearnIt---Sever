const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
    default: 'TO LEARN',
  },
  postBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
