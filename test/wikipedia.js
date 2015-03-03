var assert = require('assert');
var Wikipedia = require('../parsers/wikipedia/wikipedia.js');

describe('wikipedia', function () {
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
});
