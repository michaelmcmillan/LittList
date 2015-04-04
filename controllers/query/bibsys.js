var logger        = require('../../log/logger.js');
var Bibsys        = require('../../parsers/bibsys/bibsys.js');
var BookFactory   = require('../../database/factories/book.js'); 
var QueryFactory  = require('../../database/factories/query.js'); 
var ResultFactory = require('../../database/factories/result.js'); 

function BibsysController (req, res) {

    var queryString = req.query.q;
    var bibsys = new Bibsys();
    
    // Check if cache exists for this querystring
    QueryFactory.read(queryString, 'book', function (err, cache) {
        console.log(cache); 
    });

    // Not cached, so lets cache the query
    //QueryFactory.create(queryString, function (query_id) {

        // Retrieve books from Bibsys
        bibsys.search(queryString, function (err, books) {
            if (err) throw err;
            
            // Store all the books 
            BookFactory.createBooks(books, function (err, createdBooks) {

                // Render the results page
                res.render('results', {
                    query: queryString,
                    results: createdBooks 
                });
            });
        });
    //});

    // 2. get books
    // 3. store results
    // 4. results <=> query

}

module.exports = BibsysController;
