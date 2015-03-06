var assert = require('assert');
var Wikipedia = require('../parsers/wikipedia/wikipedia.js');

describe('wikipedia', function () {

    var wikipediaParagraph = 
        "''As with any source, especially one of unknown authorship, "      + 
        "you should be wary and independently verify the accuracy of "      +
        "Wikipedia information if possible''. For many purposes, but "      +
        "particularly in academia, Wikipedia may not be an acceptable "     + 
        "source;<ref>Bould, Dylan M., et al., ''References that anyone "    +
        "can edit: review of Wikipedia citations in peer reviewed health "  +
        "science literature'', 2014, [[British Medical Journal]], 6 March " +
        "2014, 348 [http://dx.doi.org/10.1136/bmj.g1585 DOI], [http://www." +
        "bmj.com/content/348/bmj.g1585 online from BMJ]</ref>"; 
    
    it('retrieves the ref-tags of a wikipedia text', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(wikipedia.parseRefTags(wikipediaParagraph).length, 1);
    });
    
    // http://martin-thoma.com/python-check-wiki-references-for-citation-template/
    xit('retrieves the ref-tags of a wikipedia text', function () {
        var wikipedia = new Wikipedia();  
        console.log(wikipedia.parseRefTags(wikipediaParagraph).text());
    });
     
    it('retrieves the article title from a wikipedia link', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.getArticleFromURL('http://en.wikipedia.org/wiki/Worldwide_caliphate'),
            'Worldwide_caliphate'
        );
    });
    
    it('ignores hashbangs in getArticleFromURL', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.getArticleFromURL('http://no.wikipedia.org/wiki/Borgerkrigen_i_Syria#Utbruddet'),
            'Borgerkrigen_i_Syria'
        );
    });

    it('determines if a url is a proper wikipedia article link', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.isWikipediaURL('http://no.wikipedia.org/wiki/Borgerkrigen_i_Syria#Utbruddet'),
            true
        );
    });

    it('rejects invalid language codes in wikipedia article link', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.isWikipediaURL('http://xx.wikipedia.org/wiki/Borgerkrigen_i_Syria#Utbruddet'),
            false
        );
    });
    
    it('allows https wikipedia article links', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.isWikipediaURL('https://no.wikipedia.org/wiki/Borgerkrigen_i_Syria#Utbruddet'),
            true 
        );
    });
    
    it('allows no protocol in the wikipedia article link', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.isWikipediaURL('no.wikipedia.org/wiki/Borgerkrigen_i_Syria#Utbruddet'),
            true 
        );
    });

    it('url encodes a wiki page title', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.urlEncodePage('Undergjæret_øl'),
            'Undergj%C3%A6ret_%C3%B8l' 
        );
    });

    it('url encodes a wiki page title with another charset', function () {
        var wikipedia = new Wikipedia();  
        assert.equal(
            wikipedia.urlEncodePage('Kölsch'),
            'K%C3%B6lsch' 
        );
    });
});
