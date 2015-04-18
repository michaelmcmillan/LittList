var logger = require('../../log/logger.js');
var List   = require('../../models/list.js');
var ListFactory = require('../../database/factories/list.js');
var UpdateListController = require('./update.js');

function CreateListController (req, res, next) {

    // Generate a list for this session if it does not exist
    if (req.session.list === undefined) {
        ListFactory.create(new List(), function (err, listId) {
            logger.info('Created a new list with id ' + listId);
            req.session.list = listId;     
            req.session.save(function () {
                UpdateListController(req, res, next);
            });
        });
    
    // A list already exists
    } else {
        UpdateListController(req, res, next);
    }
}

module.exports = CreateListController;
