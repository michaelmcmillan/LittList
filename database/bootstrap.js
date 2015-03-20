var config = require('../config.js');
var logger = require('../log/logger.js');
var mysql  = require('mysql');
        
var connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.username,
    database: config.database.database,
    password: config.database.password
});

connection.connect();

module.exports = connection;
