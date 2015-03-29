var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');

if (process.env['TRAVIS'] !== undefined)
    config.database = config.database.test;

module.exports = mysql.createPool(config.database);
