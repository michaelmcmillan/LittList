var logger = require('../../log/logger.js');
var List   = require('../../models/list.js');
var Book   = require('../../models/book.js');

function UpdateListController (req, res, next) {
    
    // The user is adding a reference to the list
    if (req.body.add !== undefined) {
        console.log(req.session.list);
    }

    // Finally redirect back to results page
    // or to the frontpage based on referer 
    if (req.headers.referer !== undefined)
        res.redirect(req.headers.referer);
    else
        res.redirect('/');
}

module.exports = UpdateListController;
