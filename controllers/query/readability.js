var logger           = require('../../log/logger.js');
var config           = require('../../config.js');
var Readability      = require('../../parsers/readability/readability.js');
var QueryFactory     = require('../../database/factories/query.js'); 
var WebsiteFactory   = require('../../database/factories/website.js'); 
var ListFactory      = require('../../database/factories/list.js'); 
var ResultController = require('./result.js'); 

function ReadabilityController (req, res, next) {
    var queryString = req.query.q;

    // There seems to be a bug here with the config. It does not sync with the 
    // production environment, thus this needs changing
    var readability = new Readability(config.components.readability.key);
        
    QueryFactory.read(queryString, 'website', function (err, cachedWebsites) {
        if (err) return next(err);
        
        // If the cache returned books lets not ask Bibsys
        if (cachedWebsites.length > 0) {
            logger.log('debug', 'Found Bibsys cache with %d books for "%s"',
                cachedWebsites.length, queryString);
                
            ResultController(cachedWebsites, false, req, res, next);
            
        // Empty cache means we ask Bibsys
        } else {
            logger.profile('Readability query');
        
            readability.search(queryString, function (err, website) {
                if (err) return next(err);

                logger.profile('Readability query');
                logger.log('debug', 'Readability returned result');

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

module.exports = ReadabilityController;
