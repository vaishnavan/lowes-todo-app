const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_DB);
    console.log('Database connection established');
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectToMongoDB;
