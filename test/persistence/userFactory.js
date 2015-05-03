var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');
var List        = require('../../models/list.js');
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

    it('adds a list to the previous user', function (done) {
        UserFactory.read('email@michaelmcmillan.net', function (err, readUser) {
            if (err) throw err;

            var list = new List();
            list.setId(1);
            readUser.addList(list); 

            UserFactory.update(readUser, function (err, updatedUser) {
                if (err) throw err;
                assert.equal(updatedUser.getLists().length, 1);
                done();
            });
        });
    });

    it('removes the previously added list from the user', function (done) {
        UserFactory.read('email@michaelmcmillan.net', function (err, readUser) {
            if (err) throw err;

            var list = new List();
            list.setId(1);
            readUser.removeList(list); 

            UserFactory.update(readUser, function (err, updatedUser) {
                if (err) throw err;
                assert.equal(updatedUser.getLists().length, 0);
                done();
            });
        });
    });
}); 
