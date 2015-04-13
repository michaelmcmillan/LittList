var logger = require('../../log/logger.js');
var List   = require('../../models/list.js');
var UpdateListController = require('./update.js');

function CreateListController (req, res, next) {

    // Generate a list if it does not exist
    if (req.session.list === undefined)
        req.session.list = new List().getUrl();

    UpdateListController(req, res, next);
}

module.exports = CreateListController;
