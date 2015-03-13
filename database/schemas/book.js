var database   = require('../bootstrap.js'); 
var Sequelize  = require('sequelize');

module.exports = database.define('Book', {
    isbn:            { type: Sequelize.STRING },
    title:           { type: Sequelize.STRING },
    author:          { type: Sequelize.STRING },
    publisher:       { type: Sequelize.STRING },
    publicationYear: { type: Sequelize.STRING },
});
