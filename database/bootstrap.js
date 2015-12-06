var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');

module.exports = mysql.createPool(config.database());
