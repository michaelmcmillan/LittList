var logger      = require('../../log/logger.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

function UserLoginController (req, res, next) {
    
    if (req.session.user !== undefined)
        return next(new Error('Du er allerde innlogget.')); 

    var email    = req.body.email;
    var password = req.body.password;
     
    if (email    === undefined
    ||  password === undefined)
        return next(new Error('Du må oppgi brukernavn og passord.'));

    UserFactory.read(email, function (err, readUser) {
        if (err) return next(err);
        console.log(readUser);
        checkIfPasswordMatches(readUser, password);
    });

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
        res.redirect('/liste');
    }

    var wrongPassword = function () {
        return next(new Error('Feil brukernavn eller passord.'));
    }
}

module.exports = UserLoginController;
