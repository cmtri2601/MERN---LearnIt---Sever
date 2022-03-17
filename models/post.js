const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  username: {
    title: String,
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
