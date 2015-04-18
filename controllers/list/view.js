var logger = require('../../log/logger.js');
var ListFactory = require('../../database/factories/list.js');

function ViewListController (req, res) {

    // No list exists for the current session
    if (req.session.list === undefined)
        return res.redirect('/');
    
    // Load the list for the current session 
    ListFactory.read(req.session.list, function (err, list) {
        console.log(list.getReferences()); 
        res.render('list');
    });
}

module.exports = ViewListController;
