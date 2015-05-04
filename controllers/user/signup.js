var logger      = require('../../log/logger.js');
var List        = require('../../models/list.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

function UserSignupController (req, res, next) {
    
    var email    = req.body.email;
    var password = req.body.password;
    
    if (email    === undefined
    ||  password === undefined)
        return next(new Error('Du må oppgi brukernavn og passord.'));

    try {
        var user = new User(); 
        user.setEmail(email);
    } catch (err) {
        return next(err);
    }

    user.setPassword(password, function (err) {
        if (err) return next(err);
        storeUserInDatabase(user);
    });

    var storeUserInDatabase = function (user) {
        UserFactory.create(user, function (err, createdUser) {
            if (err) return next(err);

            authenticate(createdUser);
            transferListsInSessionToUser(user, function () {
                res.redirect('/yey');
            });
        });
    }

    var authenticate = function (user) {
        req.session.user = user.getEmail();
    }
    
    var transferListsInSessionToUser = function (user, done) {
        if (req.session.list === undefined) {
            logger.debug('No lists to transfer to user.', {
                user: req.session.user
            });
            return done();
        }
        
        logger.debug('Transferring list to user', {
            user:    req.session.user,
            list_id: req.session.list
        });
        
        UserFactory.read(req.session.user, function (err, readUser) {
            if (err) return next(err);
            
            var listInSession = new List();
            listInSession.setId(req.session.list);
            readUser.addList(listInSession);
        
            UserFactory.update(readUser, function (err, updatedUser) {
                if (err) return next(err);
                return done();
            });
        });
    }
}

module.exports = UserSignupController;
