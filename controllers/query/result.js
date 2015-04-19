var logger        = require('../../log/logger.js');
var ListFactory   = require('../../database/factories/list.js'); 
var QueryFactory  = require('../../database/factories/query.js'); 

function ResultController (results, shouldCacheResults, req, res, next) {
    var queryString = req.query.q;
    
    // This function caches and renders the html based on
    // the presence of an active session
    var renderResultsView = function (queryString, results, cache) {

        // Sort the results by id so that the results
        // are consistent when we redirect the client back.
        results.sort(function (firstResult, secondResult) {
            return firstResult.getId() - secondResult.getId();
        });
        
        // Render the template with a callback for when its 
        // done. The callback is there because of async fs
        res.render('results', {
            query: queryString,
            results: results,
            pass: {
                query: queryString 
            }
        }, function (err, html) {
            if (cache) {

                // Store the results in the database so that
                // the next query with this querystring does
                // not need to ask external components like bibsys
                QueryFactory.create(queryString, results, function (err) {
                    if (err) return next(err); 
                    res.send(html);
                });
            } else {
                res.send(html);
            }
        });
    }
    
    // No active session
    if (req.session.list === undefined) { 
        renderResultsView(queryString, results, shouldCacheResults); 

    // Active session
    } else {
        ListFactory.read(req.session.list, function (err, list) {

            // Mark results that are already in the list
            // to display remove button (for added ones) and
            // add button (for "removed" ones)
            results.forEach(function(result, index) {
                var inList = (list.getReferences().indexOf(result.getId()) !== -1);
                results[index].isInList = inList; 
            });
            
            renderResultsView(queryString, results, shouldCacheResults); 
        });
    }
}

module.exports = ResultController;
