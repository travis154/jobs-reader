var mongoose = require('mongoose');
var conf = require('./config');
exports.db = mongoose.createConnection(conf.db_path);