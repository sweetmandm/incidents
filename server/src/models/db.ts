const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost:27017/incidents';
mongoose.connect(mongoUrl, { useNewUrlParser: true });

process.on('SIGINT', function() {
  mongoose.connection.close(function () { process.exit(0); });
});

require('./incident');
