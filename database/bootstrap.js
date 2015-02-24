var config = require('../config.js');
var Sequelize = require('sequelize');

var sequelize = new Sequelize(
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

var BookModel = sequelize.define('Book', {
    isbn:            { type: Sequelize.STRING },
    title:           { type: Sequelize.STRING },
    author:          { type: Sequelize.STRING },
    publisher:       { type: Sequelize.STRING },
    publicationYear: { type: Sequelize.STRING },
});

BookModel.sync().then(function () {
    console.log ('Model created.');
});
