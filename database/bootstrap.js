var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');
if (process.env['TRAVIS'] === undefined)
    var pool = mysql.createPool(config.database);
else 
    var pool = mysql.createPool(config.database.test);

module.exports = pool;
