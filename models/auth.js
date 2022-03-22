const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  created_at: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
