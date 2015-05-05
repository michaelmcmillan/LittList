var assert = require('assert');
var rewire = require('rewire');
var User   = rewire('../../models/user.js');
var List   = rewire('../../models/list.js');

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

    it('should throw exception if email does not contain exactly one @', function () {
        var user = new User();
        assert.throws(function () {
            user.setEmail('mike-without-the-required-at-char');
        });
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

    it('should encrypt a plaintext password to a hashed+salted password', function (done) {
        User.__set__('bcrypt', {
            hash: function (password, salt, done) {
                done(undefined, '$2a$06$8awH5oO9ZRaohxxB4d8zQe9f7h9J12ttLiCUAlFDndg/KclQXAtI6');
            }
        });

        var user = new User();
        user.setEmail('mike@mike.com');
        user.setPassword('brannmannsam', function (err) {
            assert.equal(user.getPassword(), '$2a$06$8awH5oO9ZRaohxxB4d8zQe9f7h9J12ttLiCUAlFDndg/KclQXAtI6'); 
            done();
        });
    });

    it('should return true if trying to authenticate with credentials that match', function (done) {
        User.__set__('bcrypt', {
            hash: function (password, salt, done) {
                done(undefined, '$2a$06$8awH5oO9ZRaohxxB4d8zQe9f7h9J12ttLiCUAlFDndg/KclQXAtI6');
            },
            compare: function (plain, hash, done) {
                return done(undefined, (plain === 'brannmannsam'));
            }
        });

        var user = new User();
        user.setEmail('mike@mike.com');
        user.setPassword('brannmannsam', function (err) {
            user.checkCredentials('brannmannsam', function (err, authenticated) {
                assert.equal(authenticated, true); 
                done();
            });
        });
    });

    it('should have no lists upon instantion', function () {
        var user = new User();
        assert.equal(user.getLists().length, 0);
    });

    it('can have lists assosicated with it by adding them', function () {
        var user = new User();
        user.addList(new List());
        assert.equal(user.getLists().length, 1);
    });

    it('should reject two lists with the same id as they are duplicates', function () {
        var user = new User();
        var firstList = new List();
        firstList.setId(1);

        var dupeOfFirstList = new List();
        dupeOfFirstList.setId(1);
        
        user.addList(firstList);
        assert.throws(function () {
            user.addList(dupeOfFirstList);
        });
    });

    it('should be possible to provide an array of lists to the addList method', function () {
        var user = new User();

        var firstList = new List();
        firstList.setId(1);
        var secondList = new List();
        secondList.setId(2);
        
        var lists = [firstList, secondList];
        user.addList(lists);
        assert.equal(user.getLists().length, 2);
    });

    it('should be possible to remove a list from a user', function () {
        var user = new User();

        var firstList = new List();
        firstList.setId(1);

        var secondList = new List();
        secondList.setId(2);
        
        var lists = [firstList, secondList];
        user.addList(lists);
        user.removeList(firstList);
        assert.equal(user.getLists()[0].getId(), 2);
    });
});
