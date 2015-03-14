var log = require('../../log/logger.js');
var QueryController = require('./query.js');

function IndexController (req, res) {
    if (req.query.q)
        QueryController(req, res);
    else 
        res.render('index'); 
}

module.exports = IndexController;
