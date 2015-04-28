var assert = require('assert');
var WikiParser = require('../../parsers/wikipedia/wikiparser.js');

describe('Wikipedia citeparser', function () {

    it('should take in wikipedia articles in html in the constructor', function () {
        var wikiparser = new WikiParser('<html>Wikipedia article</html>');
        assert.equal(wikiparser.getArticleHTML(), '<html>Wikipedia article</html>');
    });

    it('should parse li tags from the html that was provided in the constructor', function () {
        var wikiparser = new WikiParser('<html><li>This is a reference</li></html>');
        assert.equal(wikiparser.getLiTags().length, 1);
    });

    it('should parse li tags that is missing a closing tag', function () {
        var wikiparser = new WikiParser('<html><li>This is a reference</il></html>');
        assert.equal(wikiparser.getLiTags().length, 1);
    });

    it('should filter out li tags with an id that starts with "cite_note-"', function () {
        var wikiparser = new WikiParser('<html><li id="cite_note-1">This is a reference</li></html>');
        assert.equal(wikiparser.filterCitationTags(), 1);
    });

    it('should not filter out li tags without an id that starts with "cite_note-"', function () {
        var wikiparser = new WikiParser('<html><li id="citation-yall">This is a reference</li></html>');
        assert.equal(wikiparser.filterCitationTags(), 0);
    });
});
