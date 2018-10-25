import * as mongoose from 'mongoose';
import config from '../config';

const mongoUrl = `${config.mongoUrl}/incidents`;
mongoose.connect(mongoUrl, { useNewUrlParser: true });

process.on('SIGINT', function() {
  mongoose.connection.close(function () { process.exit(0); });
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./incident');
