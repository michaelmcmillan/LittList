var logger = require('../../../log/logger.js');
var SNL    = require('../../../parsers/snl/snl.js');

function SNLController (req, res) {
    var queryString = req.query.q;
    var snl = new SNL();

    snl.search(queryString, function (results) {
        console.log(results);
        if (results !== 0) {
            res.render('snl-results', {
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

module.exports = SNLController;
