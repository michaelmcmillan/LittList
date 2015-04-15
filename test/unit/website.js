var assert  = require('assert');
var Website = require('../../models/website.js');
var Author  = require('../../models/author.js');

describe('website', function () {
   
    it('should return the hostname with the first letter capitalized', function () {
        var ntnu = new Website('http://ntnu.no'); 
        assert.equal(ntnu.getTitle(), 'Ntnu');
    });
    
    it('should return the set title if defined and not resolve to hostname', function () {
        var vg = new Website('http://vg.no', 'Verdens Gang');
        assert.equal(vg.getTitle(), 'Verdens Gang');
    });

    it('should return the name of the website if there\'s no author provided', function () {
        var itavisen = new Website('http://itavisen.no');
        assert.equal(itavisen.getTitle(), 'Itavisen');
    });

    it('should be possible to set the id of a website', function () {
        var vg = new Website('http://vg.no');
        vg.setId(1);
        assert.equal(vg.getId(), 1);
    });

    it('should be possible to change the id of a website', function () {
        var vg = new Website('http://vg.no');
        vg.setId(1);
        vg.setId(3);
        assert.equal(vg.getId(), 3);
    });
});
