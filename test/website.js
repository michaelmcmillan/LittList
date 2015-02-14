var assert  = require('assert');
var Website = require('../website.js');
var Author  = require('../author.js');

describe('Website', function () {
   
    
    it('should return the hostname with the first letter capitalized', function () {
        var ntnu = new Website('http://ntnu.no'); 
        assert.equal(ntnu.getTitle(), 'Ntnu');
    });
    
    it('should return the set title if defined and not resolve to hostname', function () {
        var vg = new Website('http://vg.no', 'Verdens Gang');
        assert.equal(vg.getTitle(), 'Verdens Gang');
    });

});
