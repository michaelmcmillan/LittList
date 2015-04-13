var logger = require('../../log/logger.js');

function ViewListController (req, res) {
    console.log(req.session);
    /* If no list is specified */
    if (req.params.id === undefined) {
        res.render('list');
    } else {
        res.render('list');
    }
}

module.exports = ViewListController;
