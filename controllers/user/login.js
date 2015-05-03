var logger      = require('../../log/logger.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

function UserLoginController (req, res, next) {
    
    var email    = req.body.email;
    var password = req.body.password;
    
    if (email    !== undefined
    &&  password !== undefined) {
        UserFactory.read(email, function (err, readUser) {
            if (err) return next(err);
            checkIfPasswordMatches(readUser, password);
        });
    }

    var checkIfPasswordMatches = function (user, password) {
        user.checkCredentials(password, function (err, correctPasswordProvided) {
            if (err) return next(err);

            if (correctPasswordProvided)
                passwordMatches(user);
            else
                wrongPassword();
        });
    }

    var passwordMatches = function (user) {
        req.session.user = user.getEmail();
        res.redirect('/yey');
    }

    var wrongPassword = function () {
        res.send('feil password');
    }
}

module.exports = UserLoginController;
