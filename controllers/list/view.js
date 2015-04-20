var logger      = require('../../log/logger.js');
var Harvard     = require('../../bibliographies/harvard/harvard.js');
var ListFactory = require('../../database/factories/list.js');

function ViewListController (req, res) {

    // Redirect to frontpage when no list
    // exists for the current session
    if (req.session.list === undefined)
        return res.redirect('/');
    
    // Load the list for the current session 
    ListFactory.read(req.session.list, function (err, list) {
        res.render('list', {
            references: list.getReferences(),
            list: new Harvard(list.getReferences()),
            count: list.getReferences().length
        });
    });
}

module.exports = ViewListController;
