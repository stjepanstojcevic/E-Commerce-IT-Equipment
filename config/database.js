const mongoose = require('mongoose');

const { MONOG_URI } = process.env;

exports.connect = async () => {
  try {
    await mongoose.connect(MONOG_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
