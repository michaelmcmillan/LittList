var log = require('../../log/logger.js');
var QueryController = require('./query.js');

function IndexController (req, res) {

    log.error('Test');
    
    // Delegate to QueryController if a search is present
    if (req.query.q)
        QueryController(req, res);
    
    // Show the landing page
    else 
        res.render('index'); 

}

module.exports = IndexController;
