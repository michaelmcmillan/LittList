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

    it('should successfully add multiple authors with addAuthors (plural)', function () {
        var website = new Website('http://vg.no');
        website.addAuthors([new Author('Jo Nesbø'), new Author('Dagfinn Dybdahl')]);
        assert.equal(website.getAuthors().length, 2)
    }); 

    it('should not fail on getting hostname from slettmeg.no', function () {
        var website = new Website('https://slettmeg.no/om-oss');
        assert.doesNotThrow(function () {
            website.getHostname();
        });
    });

    it('should return hostname with the first letter in capital', function () {
        var website = new Website('https://slettmeg.no/om-oss');
        assert.equal(website.getHostname(), 'Slettmeg');
    });
    
    it('should have a method for formatting a humanreadable publication date in norwegian', function () {
        var website = new Website();
        website.setPublicationDate(new Date(2015, 5, 1));
        assert.equal(website.getHumanfriendlyPublicationDate(), '1. juni 2015');
    });

    it('should not crash when calling .getTitle on a website without title', function () {
        assert.doesNotThrow(function () {
            var website = new Website('https://slettmeg.no/om-oss');
            website.getTitle();
        });
    });

    it('should append http:// if not contained in the url', function () {
        var website = new Website();
        website.setURL('vg.no');
        assert.equal(website.getURL(), 'http://vg.no');
    });

    it('should not append http:// if http:// is already contained in the url', function () {
        var website = new Website();
        website.setURL('http://vg.no');
        assert.equal(website.getURL(), 'http://vg.no');
    });

    it('should not append http:// if https:// is already contained in the url', function () {
        var website = new Website();
        website.setURL('https://vg.no');
        assert.equal(website.getURL(), 'https://vg.no');
    });

    it('should append http:// even if leading whitespace in url', function () {
        var website = new Website();
        website.setURL('    vg.no');
        assert.equal(website.getURL(), 'http://vg.no');
    });

    it('should not throw exception if undefined is provided to setURL', function () {
        assert.doesNotThrow(function () {
            var website = new Website();
            website.setURL(undefined);
        });
    });
});
