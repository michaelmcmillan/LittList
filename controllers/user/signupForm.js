var logger      = require('../../log/logger.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

function UserSignupFormController (req, res, next) {
    res.render('signup');
}

module.exports = UserSignupFormController;
