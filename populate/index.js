const config = require('../config/db');
const mongoose = require('mongoose');
const fakeDB = require('./fakeDB');

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  async (err) => {
    if (err) {
      console.error(err);
    } else {
      await fakeDB.populate();
      await mongoose.connection.close();
      console.log('Connected to database');
    }
  }
);
