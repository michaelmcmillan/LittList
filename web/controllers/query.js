var logger = require('../../log/logger.js');
var Bibsys = require('../../parsers/bibsys/bibsys.js');

function QueryController (req, res) {
    var queryString = req.query.q;
    var bibsys      = new Bibsys();

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

module.exports = QueryController;
