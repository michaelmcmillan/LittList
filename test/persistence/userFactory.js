var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');
var User        = require('../../models/user.js');
var UserFactory = require('../../database/factories/user.js');

describe('UserFactory', function () {

    it('creates a user entry in the database', function (done) {
        var user = new User();
        user.setEmail('email@michaelmcmillan.net');
        user.setPassword('thisismypassword', function () {
            UserFactory.create(user, function (err, createdUser) {
                if (err) throw err;
                assert.equal(createdUser.getId(), 1);
                done();
            });
        });
    });
}); 
