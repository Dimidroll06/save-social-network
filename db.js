const mongoose = require('mongoose');
const { mongoURI } = require('./lib/mongodb-config.js');

mongoose.connect(mongoURI, {
  useNewUrlParser: true
});

module.exports = mongoose.connection;