var database   = require('../bootstrap.js'); 
var Sequelize  = require('sequelize');

module.exports = database.define('Website', {
    url:             { type: Sequelize.STRING },
    title:           { type: Sequelize.STRING },
    author:          { type: Sequelize.STRING },
    publicationDate: { type: Sequelize.STRING },
});
