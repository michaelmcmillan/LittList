var assert = require('assert');
var rewire = require('rewire');
var UserSignupController = rewire('../../controllers/user/signup.js');

describe('Signup', function () {
    
    it('should return an error if email and password are not provided', function (done) {
        var reqMock = { 
            body: {
                email: 'email@email.com',
                password: undefined
            }
        };

        UserSignupController(reqMock, undefined, function (err) {
            assert.equal(err.message.indexOf('brukernavn og passord') !== -1, true);
            done();    
        });
    });

    it('should return an error if the email is invalid', function (done) {
        var reqMock = {
            body: {
                email: 'not-a-valid-email',
                password: 'valid-password-though'
            }
        }

        UserSignupController(reqMock, undefined, function (err) {
            assert.equal(err.message.indexOf('e-post') !== -1, true);
            done();
        });
    });
});
