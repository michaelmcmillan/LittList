var logger    = require('../../log/logger.js');
var SNL       = require('../../parsers/snl/snl.js');
var Bibsys    = require('../../parsers/bibsys/bibsys.js');
var Wikipedia = require('../../parsers/wikipedia/wikipedia.js'); 

function QueryController (req, res) {
    var queryString = req.query.q;
    var snl         = new SNL();
    var bibsys      = new Bibsys();
    var wikipedia   = new Wikipedia();
    
    /* Wikipedia */
    if (wikipedia.isWikipediaURL(queryString)) {
        wikipedia.search(queryString, function (results) {
            console.log(results);
            if (results.length !== 0) {
                res.render('wikipedia-results', {
                    query: queryString,
                    results: results 
                });
            } else {
                res.render('no-results', {
                    query: queryString
                });
            } 
        });
    
    /* SNL */
    } else if (snl.isSNLURL(queryString)) {
        console.log('snl folks');
    
    /* Bibsys */
    } else {
        bibsys.search(queryString, function (results) {
            if (results.length !== 0) {
                res.render('results', {
                    query: queryString,
                    results: results
                });
            } else {
                logger.info('No results found for "' + queryString + '"');
                res.render('no-results', {
                    query: queryString
                });
            }
        });
    }
}

module.exports = QueryController;
