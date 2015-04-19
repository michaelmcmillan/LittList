var logger        = require('../../log/logger.js');
var ListFactory   = require('../../database/factories/list.js'); 
var QueryFactory  = require('../../database/factories/query.js'); 

function ResultController (results, shouldCacheResults, req, res, next) {
    var queryString = req.query.q;
    
    // This function caches and renders the html based on
    // the presence of an active session
    var renderResultsView = function (queryString, results, cache) {
        logger.log('debug', 'Rendering results view with %d results', results.length);
        
        // Sort the results by id so that the results
        // are consistent when we redirect the client back.
        results.sort(function (firstResult, secondResult) {
            return firstResult.getId() - secondResult.getId();
        });

        res.render('results', {
            query: queryString,
            results: results 
        }, function (err, html) {
            if (cache) {
                QueryFactory.create(queryString, results, function (err) {
                    if (err) return next(err); 
                    res.send(html);
                });
            } else {
                res.send(html);
            }
        });
    }
    
    // When there is no session we simply return the 
    // results to the client.
    if (req.session.list === undefined) { 
        renderResultsView(queryString, results, shouldCacheResults); 

    // If there is an active client we mark the results that
    // are already in the list to diff between add/remove btns.
    } else {
        ListFactory.read(req.session.list, function (err, list) {
            results.forEach(function(result, index) {
                var inList = (list.getReferences().indexOf(result.getId()) !== -1);
                results[index].isInList = inList; 
            });
            
            renderResultsView(queryString, results, shouldCacheResults); 
        });
    }
}

module.exports = ResultController;
