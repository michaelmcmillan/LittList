var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');

if (process.env['TRAVIS'] !== undefined) {
    console.log('Connection details', config.database.test);
    var connection = mysql.createConnection(config.database.test);
} else {
    console.log('Connection details', config.database);
    var connection = mysql.createConnection(config.database);
}

connection.connect();

module.exports = connection;
