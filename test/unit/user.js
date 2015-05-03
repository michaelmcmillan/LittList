var assert = require('assert');
var rewire = require('rewire');
var User   = rewire('../../models/user.js');

describe('User', function () {

    it('should not have an id when instantiating', function () {
        var user = new User();
        assert.equal(user.getId(), undefined);
    });

    it('should be possible to set the id of a user', function () {
        var user = new User();
        user.setId(1);
        assert.equal(user.getId(), 1);
    });
    
    it('should be possible to set the email of a user', function () {
        var user = new User();
        user.setEmail('mike@mike.com');
        assert.equal(user.getEmail(), 'mike@mike.com');
    });

    it('should not be possible to set the email when it is already set', function () {
        var user = new User();
        user.setEmail('mike@mike.com');
        assert.throws(function () {
            user.setEmail('eirik@mike.com');
        });
    });

    it('should throw exception if password is less than 7 chars', function () {
        var user = new User();
        user.setEmail('mike@mike.com');
        user.setPassword('ohoh', function (err) {
            assert.equal(err.message.indexOf('kort') !== -1, true); 
        });
    });

    it('should encrypt a plaintext password to a hashed+salted password', function () {
        User.__set__('bcrypt', {
            genSalt: function (length, done) {
                done(undefined, '$2a$06$8awH5oO9ZRaohxxB4d8zQe');
            },

            hash: function (password, salt, done) {
                done(undefined, '$2a$06$8awH5oO9ZRaohxxB4d8zQe9f7h9J12ttLiCUAlFDndg/KclQXAtI6');
            }
        });

        var user = new User();
        user.setEmail('mike@mike.com');
        user.setPassword('brannmannsam', function (err) {
            assert.equal(user.getPassword(), '$2a$06$8awH5oO9ZRaohxxB4d8zQe9f7h9J12ttLiCUAlFDndg/KclQXAtI6'); 
        });
    });
});
