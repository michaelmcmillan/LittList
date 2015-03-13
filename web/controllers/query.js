var Bibsys = require('../../parsers/bibsys/bibsys.js');

function QueryController (req, res) {
    var bibsys = new Bibsys();

    bibsys.search(req.query.q, function (results) {
        res.render('results', {
            query: req.query.q,
            results: results
        }); 
    });
}

module.exports = QueryController;
