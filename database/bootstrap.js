var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');

if (process.env['TRAVIS'] !== undefined) {
    var connection = mysql.createConnection({
        host: config.database.test.host,
        user: config.database.test.user,
        password: config.database.test.password
    });
} else {
    var connection = mysql.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    });
}

connection.connect();
module.exports = connection;
