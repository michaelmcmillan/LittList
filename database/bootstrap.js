var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');

if (process.env['TRAVIS'] !== undefined)
    var connection = mysql.createConnection(config.database.test);
else
    var connection = mysql.createConnection(config.database);

var connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.username,
    database: config.database.database,
    password: config.database.password
});

connection.connect();

module.exports = connection;
