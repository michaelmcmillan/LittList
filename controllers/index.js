var log = require('../log/logger.js');
var FunnelController = require('./query/funnel.js');

function IndexController (req, res, next) {
    if (req.query.q)
        FunnelController(req, res, next);
    else 
        res.render('index'); 
}

module.exports = IndexController;
