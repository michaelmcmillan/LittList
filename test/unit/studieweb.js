var assert    = require('assert');
var Studieweb = require('../../parsers/studieweb/studieweb.js');

describe('Studieweb', function () {
    
    it('should pass if url is from studieweb', function () {
        var studieweb = new Studieweb();  
        assert.equal(studieweb.isStudiewebURL('http://studieweb.net/hva-er-metodelaere/'), true);
    });

    it('should not pass if url is not from studieweb', function () {
        var studieweb = new Studieweb();  
        assert.equal(studieweb.isStudiewebURL('http://snl.no'), false);
    });

    it('should pass if url is from studieweb.no without protocol', function () {
        var studieweb = new Studieweb();  
        assert.equal(studieweb.isStudiewebURL('studieweb.net/sosiologi-og-sosialantropologi/'), true);
    });
    
    it('should extract title from the html of a resource', function () {
        var studieweb = new Studieweb();
        var node = studieweb.parse('<meta property="og:title" content="Sosiologi og sosialantropologi" />');
        assert.equal(node.getTitle(), 'Sosiologi og sosialantropologi');
    });

    it('should format the title with capital letter', function () {
        var studieweb = new Studieweb();
        var node = studieweb.parse('<meta property="og:title" content="sosiologi og sosialantropologi" />');
        assert.equal(node.getTitle(), 'Sosiologi og sosialantropologi');
    });

    it('should filter out the suffix "- Studieweb.net" from the title tag', function () {
        var studieweb = new Studieweb();
        var node = studieweb.parse('<meta property="og:title" content="Sosiologi og sosialantropologi - Studieweb.net" />');
        assert.equal(node.getTitle(), 'Sosiologi og sosialantropologi');
    });

    it('should return undefined when calling .getTitle when no title is set', function () {
        var studieweb = new Studieweb();
        var node = studieweb.parse('<meta property="og:non-title" content="Sosiologi og sosialantropologi - Studieweb.net" />');
        assert.equal(node.getTitle(), undefined);
    });
});
