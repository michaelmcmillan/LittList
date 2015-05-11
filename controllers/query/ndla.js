var config           = require('../../config.js');
var logger           = require('../../log/logger.js');
var NDLA             = require('../../parsers/ndla/ndla.js');
var QueryFactory     = require('../../database/factories/query.js'); 
var WebsiteFactory   = require('../../database/factories/website.js'); 
var ListFactory      = require('../../database/factories/list.js'); 
var ResultController = require('./result.js'); 

function NDLAController (req, res, next) {
    var queryString = req.query.q;
    var ndla         = new NDLA();
        
    QueryFactory.read(queryString, 'website', function (err, cachedWebsites) {
        if (err) return next(err);
        
        // If the cache returned website lets not ask NDLA 
        if (cachedWebsites.length > 0) {
            logger.log('debug', 'Found NDLA cache with %d website for "%s"',
                cachedWebsites.length, queryString);
                
            ResultController(cachedWebsites, false, req, res, next);
            
        // Empty cache means we ask NDLA 
        } else {
            logger.profile('NDLA query');
        
            ndla.search(queryString, function (err, website) {
                if (err) return next(err);

                logger.profile('NDLA query');
                logger.log('debug', 'NDLA returned result');
                console.log(website);

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

module.exports = NDLAController;
