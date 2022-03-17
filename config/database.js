const mongoose = require('mongoose');

const ConnetDB = async () => {
  mongoose.connection
    .once('open', () => console.log('Connected to MongoDB!'))
    .on('error', err => console.error('Connecting to MongoDB ' + err));

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = ConnetDB;
