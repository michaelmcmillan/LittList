var assert = require('assert');
var SNL    = require('../../parsers/snl/snl.js');

describe('Store norske leksikon', function () {
    
    it('should pass if url is from snl.no', function () {
        var snl = new SNL();  
        assert.equal(snl.isSNLURL('http://snl.no/Jens_Stoltenberg'), true);
    });
    
    it('should pass if url contains only one forward slash', function () {
        var snl = new SNL();  
        assert.equal(snl.isSNLURL('http://snl.no/om-oss/ansatte'), false);
    });

    it('should return the article name from the url', function () {
        var snl = new SNL();
        assert.equal(snl.getArticleFromURL('http://snl.no/Jens_Stoltenberg'), 'Jens_Stoltenberg');
    });
    
    it('should avoid hashbangs in the url', function () {
        var snl = new SNL();
        assert.equal(snl.getArticleFromURL('http://snl.no/Erna_Solberg#Karriere'), 'Erna_Solberg');
    });

    it('should support articles with utf-8 characters in the article title', function () {
        var snl = new SNL();
        assert.equal(snl.getArticleFromURL('https://snl.no/René_Descartes'), 'Ren%C3%A9_Descartes');
    });
    
    it('should pass if url is from snl.no without protocol', function () {
        var snl = new SNL();  
        assert.equal(snl.isSNLURL('snl.no/Jens_Stoltenberg'), true);
    });

    it('should pass if url is the "nynorsk" version of snl.no', function () {
        var snl = new SNL();  
        assert.equal(snl.isSNLURL('https://nbl.snl.no/Halldis_Moren_Vesaas'), true);
    });

    it('should determine if it is nbl version of snl.no', function () {
        var snl = new SNL();  
        assert.equal(snl.isNBLArticle('https://nbl.snl.no/Halldis_Moren_Vesaas'), true);
    });

    it('should not strip away nbl subdomain if nbl article is provided', function () {
        var snl = new SNL();  
        assert.equal(snl.generateURLFromQuerystring('https://nbl.snl.no/Halldis_Moren_Vesaas'), 'https://nbl.snl.no/Halldis_Moren_Vesaas.json');
    });

    it('should strip away nbl subdomain if a non-nbl article is provided', function () {
        var snl = new SNL();  
        assert.equal(snl.generateURLFromQuerystring('https://snl.no/Halldis_Moren_Vesaas'), 'https://snl.no/Halldis_Moren_Vesaas.json');
    });
});
