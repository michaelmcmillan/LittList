var logger      = require('../../log/logger.js');
var User        = require('../../models/user.js');

function UserLoginFormController (req, res, next) {
    res.render('login');    
}

module.exports = UserLoginFormController;
