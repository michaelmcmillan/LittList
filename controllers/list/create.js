var logger    = require('../../log/logger.js');

function CreateListController (req, res) {

    /* Generate a list if it does not exist */
    if (req.session.list === undefined) {
        req.session.list = {
            id: '12121',
            books: ['first', 'second', 'third'] 
        };
    }
        
    /* Redirect back to results if referer is provided */
    if (req.headers.referer !== undefined) {
        res.redirect(req.headers.referer);
    }
    
    /* If no referer, redirect to the list */
    else {
        res.redirect('/liste/' + req.session.list.id);
    }
}

module.exports = CreateListController;
