const mongoose = require('mongoose');
const mongoURI =
  'mongodb+srv://inotebook:password_321@inotebook.ev8niut.mongodb.net/?retryWrites=true&w=majority';

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log('Connected!');
  });
};

module.exports = connectToMongo;
