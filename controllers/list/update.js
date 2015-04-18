var logger = require('../../log/logger.js');
var List   = require('../../models/list.js');
var Book   = require('../../models/book.js');
var ListFactory = require('../../database/factories/list.js');

function UpdateListController (req, res, next) {
    
    ListFactory.read(req.session.list, function (err, list) {
        if (req.body.add !== undefined)
            list.addReference(req.body.add); 
        
        if (req.body.remove !== undefined)
            list.removeReference(req.body.remove); 

        ListFactory.update(list, function (err, list) {
            res.redirect('/');
        });
    });
}

module.exports = UpdateListController;
