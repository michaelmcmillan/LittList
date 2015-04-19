var logger        = require('../../log/logger.js');
var ListFactory   = require('../../database/factories/list.js'); 

function ResultController (results, req, res, next) {

    var queryString = req.query.q;
    
    var renderResults = function (queryString, results) {

        results.sort(function (firstResult, secondResult) {
            return firstResult.getId() - secondResult.getId();
        });

        res.render('results', {
            query: queryString,
            results: results 
        });
    }

    if (req.session.list === undefined) { 
        renderResults(queryString, results);
    } else {
        ListFactory.read(req.session.list, function (err, list) {
            results.forEach(function(result, index) {
                var inList = (list.getReferences().indexOf(result.getId()) !== -1);
                results[index].isInList = inList; 
            });

            renderResults(queryString, results);
        });
    }
}

module.exports = ResultController;
