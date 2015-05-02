var logger    = require('../../log/logger.js');
var Wikipedia = require('../../parsers/wikipedia/wikipedia.js'); 

function WikipediaController (req, res) {
    var queryString = req.query.q;
    var wikipedia   = new Wikipedia();

    wikipedia.search(queryString, function (err, articleHTML) {
        res.render('wikipedia-editor', {
            query  : queryString,
            article: articleHTML 
        });
    });
}

module.exports = WikipediaController;
