var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');

if (process.env['TRAVIS'] !== undefined)
    var connection = mysql.createConnection(config.database.test);
else
    var connection = mysql.createConnection(config.database);

connection.connect();

module.exports = connection;
