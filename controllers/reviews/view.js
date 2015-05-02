var logger = require('../../log/logger.js');
var reviews = require('./reviews.json');

function ReviewsViewController (req, res, next) {
    res.render('reviews', reviews);
}

module.exports = ReviewsViewController;
