var config = require('../config.js');
var Sequelize = require('sequelize');

module.exports = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password, {
        
        host:    config.database.host,
        dialect: config.database.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);
