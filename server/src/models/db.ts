const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/incidents';
mongoose.connect(mongoUrl, { useNewUrlParser: true });

process.on('SIGINT', function() {
  mongoose.connection.close(function () { process.exit(0); });
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./incident');
