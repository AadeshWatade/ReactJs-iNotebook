const mongoose = require('mongoose');
const mongoURI =
  'mongodb+srv://mongoglc:password_123@cluster0.fmpot.mongodb.net/inotebook?retryWrites=true&w=majority';
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log('Connected!');
  });
};

module.exports = connectToMongo;
