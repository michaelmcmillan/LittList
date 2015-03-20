var log = require('../../log/logger.js');
var FunnelController = require('./query/funnel.js');

function IndexController (req, res) {
    if (req.query.q)
        FunnelController(req, res);
    else 
        res.render('index'); 
}

module.exports = IndexController;
