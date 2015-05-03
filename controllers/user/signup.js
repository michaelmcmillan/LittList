var logger      = require('../../log/logger.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

function UserSignupController (req, res, next) {
    
    var email    = req.body.email;
    var password = req.body.password;
    
    if (email    !== undefined
    &&  password !== undefined) {
        var user = new User(); 
        user.setEmail(email);
        user.setPassword(password, function (err) {
            if (err) return next(err);
            storeUserInDatabase(user);
        });
    }

    var storeUserInDatabase = function (user) {
        UserFactory.create(user, function (err, createdUser) {
            if (err) return next(err);
            authenticateAndRedirect(createdUser);
        });
    }
    
    var authenticateAndRedirect = function (user) {
        req.session.user = user.getEmail();
        res.redirect('/yey');
    }
}

module.exports = UserSignupController;
