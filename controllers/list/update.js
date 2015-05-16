var logger = require('../../log/logger.js');
var config = require('../../config.js');
var List   = require('../../models/list.js');
var Book   = require('../../models/book.js');
var ListFactory = require('../../database/factories/list.js');

function UpdateListController (req, res, next) {
    
    ListFactory.read(req.session.list, function (err, list) {
        if (err) return next(err);
        
        // Adding a reference
        if (req.body.add !== undefined) {
            var book = new Book().setId(parseInt(req.body.add, 10));
            list.addReference(book); 
        } 
        
        // Removing reference(s)
        // Only if style is not changed
        if (req.body.remove !== undefined && req.body.removed !== undefined) {
            list.removeReference(req.body.remove); 
        }
        
        // Changing the bibliography style
        if (req.body.style !== undefined && req.body.styled !== undefined) {
            var allowedStyleFiles = Object.keys(config.bibliography.styles.allowed);
            if (allowedStyleFiles.indexOf(req.body.style) !== -1)
                list.setBibliographyStyle(req.body.style);
        }

        // Update the model with the above changes to the database
        ListFactory.update(list, function (err, list) {
            if (err) return next(err);

            logger.log('debug', 'Updated list contents', {
                id:      list.getId(),
                style:   req.body.style  || null,
                added:   req.body.add    || null,
                removed: req.body.remove || null
            });
            
            // Redirect to previous page if referer is available 
            if (req.headers.referer !== undefined)
                res.redirect(req.headers.referer);
            else
                res.redirect('/liste');
        });
    });
}

module.exports = UpdateListController;
