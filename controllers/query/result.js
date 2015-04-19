var logger        = require('../../log/logger.js');
var ListFactory   = require('../../database/factories/list.js'); 

function ResultController (results, req, res, next) {

    var queryString = req.query.q;
    
    if (req.session.list === undefined) { 
        res.render('results', {
            query: queryString,
            results: results 
        });

    } else {
        ListFactory.read(req.session.list, function (err, list) {
            results.forEach(function(result, index) {
                var inList = (list.getReferences().indexOf(result.getId()) !== -1);
                results[index].isInList = inList; 
            });

            res.render('results', {
                query: queryString,
                results: results 
            });
        });
    }
}

module.exports = ResultController;
