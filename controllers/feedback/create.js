var logger = require('../../log/logger.js');
var FeedbackFactory = require('../../database/factories/feedback.js');

function FeedbackCreateController (req, res, next) {

    if (req.body.feedback === undefined)
        return next(new Error('Mangler tilbakemelding.'));
    
    FeedbackFactory.create(req.body.feedback, function (err) {
        if (err) logger.error(err.message);
        logger.notify('Tilbakemelding fra bruker.');
    });

    res.redirect('/liste');
}

module.exports = FeedbackCreateController;
