var logger    = require('../../log/logger.js');

function ListController (req, res) {
    if (req.method === 'GET') {
        res.render('list'); 
    } else if (req.method === 'POST') {
        res.render('list');
    }
}

module.exports = ListController;
