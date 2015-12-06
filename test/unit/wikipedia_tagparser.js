var assert = require('assert');
var WikiParser = require('../../parsers/wikipedia/wikiparser.js');

describe('Wikipedia citeparser', function () {

    it('should take in wikipedia articles in html in the constructor', function () {
        var wikiparser = new WikiParser('<html>Wikipedia article</html>');
        assert.equal(wikiparser.getArticleHTML(), '<html>Wikipedia article</html>');
    });

    it('should parse tags with an id that starts with "cite_note-"', function () {
        var wikiparser = new WikiParser('<html><li id="cite_note-1">This is a reference</li></html>');
        assert.equal(wikiparser.getLiTags().length, 1);
    });
    
    it('should return a length of 0 when suppliying an undefined as html', function () {
        var wikiparser = new WikiParser(undefined);
        assert.equal(wikiparser.getLiTags().length, 0);
    });    

    it('should not parse tags without id that starts with "cite_note-"', function () {
        var wikiparser = new WikiParser('<html><li id="citation-yall">This is a reference</li></html>');
        assert.equal(wikiparser.getLiTags().length, 0);
    });

    it('should parse url from citation tag if it contains a link with "external" class', function () {
        var wikiHtml = '<li id="cite_note-9"><b><a href="#cite_ref-9">^</a></b>' + 
            '<span class="reference-text"><a rel="nofollow" class="external text"  ' +
            'href="http://www.ssb.no/emner/02/01/10/innvbef/">'+
            'SSB: Rekordstor vekst i innvandrerbefolkningen</a></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(0).url, 'http://www.ssb.no/emner/02/01/10/innvbef/');
    });

    it('should should return the reference text from the li tag if present', function () {
        var wikiHtml = '<li id="cite_note-9"><b><a href="#cite_ref-9">^</a></b>' + 
            '<span class="reference-text"><a rel="nofollow" class="external text"  ' +
            'href="http://www.ssb.no/emner/02/01/10/innvbef/">'+
            'SSB: Rekordstor vekst i innvandrerbefolkningen</a></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(0).text, 'SSB: Rekordstor vekst i innvandrerbefolkningen');
    });

    it('should not include a reference date text when extracting the text from a li tag', function () {
        var wikiHtml = '<li id="cite_note-19"><b><a href="#cite_ref-19">^</a></b>' + 
            '<span class="reference-text"><span class="citation web">Statistisk sentralbyrå ' +
            '(9. april 2015). <a rel="nofollow" class="external text" ' +
            'href="http://www.ssb.no/223508/tettsteder.folkemengde-og-areal-etter-kommune.1.januar-2014">' +
            '«Tettsteder. Folkemengde og areal, etter kommune.»</a><span class="reference-accessdate">. ' +
            'Besøkt 11. april 2015</span>.</span><span title="ctx_ver=" class="Z3988">' + 
            '<span style="display:none;">&nbsp;</span></span></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(0).text, 'Statistisk sentralbyrå (9. april 2015). «Tettsteder. Folkemengde og areal, etter kommune.».');
    });

    it('should not matter what language the content is in when extracting text', function () {
           var wikiHtml = '<li id="cite_note-79"><span class="mw-cite-backlink">' + 
               '<b><a href="#cite_ref-79">^</a>' + 
               '</b></span> <span class="reference-text"><span class="citation web">' + 
               '<a rel="nofollow" class="external text" ' + 
               'href="http://www.bbc.co.uk/history/british/victorians/foundling_01.shtml">' + 
               '"The Foundling Hospital"</a>. BBC History. 17 February 2011' + 
               '<span class="reference-accessdate">. Retrieved <span class="nowrap">' + 
               '13 December</span> 2011</span>.</span><span title="ctx_ver=" class="Z3988">' + 
               '<span style="display:none;">&nbsp;</span></span></span></li>';
        var wikiparser = new WikiParser(wikiHtml);
        assert.equal(wikiparser.getCitation(0).url, 'http://www.bbc.co.uk/history/british/victorians/foundling_01.shtml');
        assert.equal(wikiparser.getCitation(0).text, '"The Foundling Hospital". BBC History. 17 February 2011.');
    });
});
