var logger        = require('../../log/logger.js');
var Bibsys        = require('../../parsers/bibsys/bibsys.js');
var BookFactory   = require('../../database/factories/book.js'); 
var QueryFactory  = require('../../database/factories/query.js'); 

function BibsysController (req, res, next) {

    var queryString = req.query.q;
    var bibsys = new Bibsys();

    QueryFactory.read(queryString, 'book', function (err, cachedBooks) {
        if (err) return next(err);

        // If the cache returned books lets not ask Bibsys
        if (cachedBooks.length > 0) {
            logger.log('info', 'Returning Bibsys cache for "%s"', queryString);

            res.render('results', {
                query: queryString,
                results: cachedBooks 
            });
            
        // Empty cache means we ask Bibsys
        } else {
            logger.log('info', 'Querying Bibsys for "%s"', queryString);
        
            bibsys.search(queryString, function (err, books) {
                if (err) return next(err);
                logger.log('info', 'Bibsys returned %d results for "%s"', books.length, queryString);

                // Store all the books 
                BookFactory.createAll(books, function (err, createdBooks) {
                    if (err) return next(err);

                    // First render the results page
                    res.render('results', {
                        query: queryString,
                        results: createdBooks 
                    });
                    
                    // Secondly cache the results
                    QueryFactory.create(queryString, createdBooks, function (err, cachedBooks) {
                        if (err) return next(err); 
                    });
                });
            });
        }
    });
}

module.exports = BibsysController;
