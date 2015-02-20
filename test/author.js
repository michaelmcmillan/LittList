var assert = require('assert');
var Author = require('../references/author.js');

describe('author', function () {
    it('should strip away numbers', function () {
        var dawkins = new Author('Richard Dawkins 1964');              
        assert.equal(dawkins.getName(), 'Richard Dawkins');
    });
    
    it('should strip trailing whitespace', function () {
        var shakespear = new Author('William Shakespear ');              
        assert.equal(shakespear.getName(), 'William Shakespear');
    });
    
    it('should not strip dashes which are part of a name', function () {
        var shakespear = new Author('Hans-Fredrik Hansen');              
        assert.equal(shakespear.getName(), 'Hans-Fredrik Hansen');
    });
    
    it('should strip dashes which are not part of a name', function () {
        var shakespear = new Author('Jo Nesbø -'); 
        assert.equal(shakespear.getName(), 'Jo Nesbø');
    });

    it('should correctly generate initials', function () {
        var nesbø = new Author('Jo Nesbø'); 
        assert.equal(nesbø.getInitials(nesbø.getForename()), 'J');
    });
    
    it('should correctly generate initials for a forename consisting of two names', function () {
        var dybvig = new Author('Dagfinn Døhl Dybvig'); 
        assert.equal(dybvig.getInitials(dybvig.getForename()), 'DD');
    });
});
