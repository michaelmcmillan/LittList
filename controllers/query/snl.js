var logger           = require('../../log/logger.js');
var config           = require('../../config.js');
var SNL              = require('../../parsers/snl/snl.js');
var QueryFactory     = require('../../database/factories/query.js'); 
var WebsiteFactory   = require('../../database/factories/website.js'); 
var ListFactory      = require('../../database/factories/list.js'); 
var ResultController = require('./result.js'); 

function SNLController (req, res, next) {
    var queryString = req.query.q;
    var snl         = new SNL();
        
    QueryFactory.read(queryString, 'website', function (err, cachedWebsites) {
        if (err) return next(err);
        
        // If the cache returned website lets not ask SNL 
        if (cachedWebsites.length > 0) {
            logger.log('debug', 'Found SNL cache with %d website for "%s"',
                cachedWebsites.length, queryString);
                
            ResultController(cachedWebsites, false, req, res, next);
            
        // Empty cache means we ask SNL 
        } else {
            logger.profile('SNL query');
        
            snl.search(queryString, function (err, website) {
                if (err) return next(err);

                logger.profile('SNL query');
                logger.log('debug', 'SNL returned result');

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

module.exports = SNLController;
