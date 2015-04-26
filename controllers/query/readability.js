var logger           = require('../../log/logger.js');
var config           = require('../../config.js');
var Readability      = require('../../parsers/readability/readability.js');
var QueryFactory     = require('../../database/factories/query.js'); 
var ListFactory      = require('../../database/factories/list.js'); 
var ResultController = require('./result.js'); 

function ReadabilityController (req, res, next) {
    var queryString = req.query.q;
    var readability = new Readability(config.components.readability.key);
        
    readability.search(queryString, function (err, website) {
        if (err) return next(err);
        console.log(website.getTitle());
    });
}

module.exports = ReadabilityController;
