var logger           = require('../../log/logger.js');
var Bibsys           = require('../../parsers/bibsys/bibsys.js');
var BookFactory      = require('../../database/factories/book.js'); 
var QueryFactory     = require('../../database/factories/query.js'); 
var ListFactory      = require('../../database/factories/list.js'); 
var ResultController = require('./result.js'); 

function BibsysController (req, res, next) {

    var queryString = req.query.q;
    var bibsys = new Bibsys();

    QueryFactory.read(queryString, 'book', function (err, cachedBooks) {
        if (err) return next(err);
        
        // If the cache returned books lets not ask Bibsys
        if (cachedBooks.length > 0) {
            logger.log('debug', 'Returning Bibsys cache with %d books for "%s"',
                cachedBooks.length, queryString);
            
            return ResultController(cachedBooks, req, res, next);
            
        // Empty cache means we ask Bibsys
        } else {
            logger.profile('Bibsys query');
            logger.log('debug', 'Querying Bibsys for "%s"', queryString);
        
            bibsys.search(queryString, function (err, books) {
                if (err) return next(err);
                logger.profile('Bibsys query');
                logger.log('debug', 'Bibsys returned %d results for "%s"', books.length, queryString);

                // Store all the books 
                BookFactory.createAll(books, function (err, createdBooks) {
                    if (err) return next(err);

                    ResultController(createdBooks, req, res, next);
                    
                    // Cache the results to the query string
                    QueryFactory.create(queryString, createdBooks, function (err, cachedBooks) {
                        if (err) return next(err); 
                    });
                });
            });
        }
    });
}

module.exports = BibsysController;
