var logger = require('../../log/logger.js');
var Bibsys = require('../../parsers/bibsys/bibsys.js');

function QueryController (req, res) {
    var bibsys = new Bibsys();
    var query  = req.query.q;

    bibsys.search(query, function (results) {
        if (results.length !== 0) {
            res.render('results', {
                query: query,
                results: results
            });
        } else {
            logger.info('No results found for "' + query + '"');
            res.render('results');
        }
    });
}

module.exports = QueryController;
