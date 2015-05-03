var logger      = require('../../log/logger.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

function UserSignupFormController (req, res, next) {
    res.send('regg deg her');    
}

module.exports = UserSignupFormController;
