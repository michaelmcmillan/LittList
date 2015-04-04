var logger    = require('../../log/logger.js');
var Wikipedia = require('../../parsers/wikipedia/wikipedia.js'); 

function WikipediaController (req, res) {
    var queryString = req.query.q;
    var wikipedia = new Wikipedia();

    wikipedia.search(queryString, function (results) {
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
}

module.exports = WikipediaController;
