var config           = require('../../config.js');
var logger           = require('../../log/logger.js');
var Studieweb        = require('../../parsers/studieweb/studieweb.js');
var QueryFactory     = require('../../database/factories/query.js'); 
var WebsiteFactory   = require('../../database/factories/website.js'); 
var ListFactory      = require('../../database/factories/list.js'); 
var ResultController = require('./result.js'); 

function StudiewebController (req, res, next) {
    var queryString = req.query.q;
    var studieweb   = new Studieweb();
        
    QueryFactory.read(queryString, 'website', function (err, cachedWebsites) {
        if (err) return next(err);
        
        // If the cache returned website lets not ask Studieweb 
        if (cachedWebsites.length > 0) {
            logger.log('debug', 'Found Studieweb cache with %d website for "%s"',
                cachedWebsites.length, queryString);
                
            ResultController(cachedWebsites, false, req, res, next);
            
        // Empty cache means we ask Studieweb 
        } else {
            logger.profile('Studieweb query');
        
            studieweb.search(queryString, function (err, website) {
                if (err) return next(err);

                logger.profile('Studieweb query');
                logger.log('debug', 'Studieweb returned result');

                // Store all the websites 
                WebsiteFactory.create(website, function (err, createdWebsite) {
                    if (err) return next(err);
                    logger.log('debug', 'Created website in the database');

                    // Cache the results to the query string
                    ResultController([createdWebsite], true, req, res, next);
                });
            });
        }
    });
}

module.exports = StudiewebController;
