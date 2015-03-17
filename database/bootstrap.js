var config = require('../config.js');
var Sequelize = require('sequelize');
var logger = require('../log/logger.js');

module.exports = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password, {
        logging: logger.debug,        
        host:    config.database.host,
        dialect: config.database.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);
