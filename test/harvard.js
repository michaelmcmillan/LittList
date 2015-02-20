var assert  = require('assert');
var Harvard = require('../bibliographies/harvard/harvard.js');
var Book    = require('../references/book.js');
var Website = require('../references/website.js');
var Author  = require('../references/author.js');

describe('bibliography#harvard', function () {
    
    var references = [];

    before(function () {
        
        var exphil = new Book('Det tenkende mennesket');
        exphil.addAuthor(new Author('Dagfinn Døhl Dybvig'));
        exphil.addAuthor(new Author('Magne Dybvig'));
        exphil.setPublicationYear(2004);
        references.push(exphil);
        
        var internetLaw = new Book('101 Things You Need To Know about Internet Law');
        internetLaw.addAuthor(new Author('Jonathan Bick'));
        references.push(internetLaw);
        
        var theGodDelusion = new Book('The God Delusion');
        theGodDelusion.addAuthor(new Author('Richard Dawkins'));
        theGodDelusion.setPublicationYear(2006);
        references.push(theGodDelusion);
        
        var fakeyBook = new Book('The Fake Book');
        fakeyBook.addAuthor(new Author('Richard Brandson Smith'));
        references.push(fakeyBook);
        
        var manyAuthorsBook = new Book('A lot of authors');
        manyAuthorsBook.addAuthor(new Author('Åslaug Ågesen'));
        manyAuthorsBook.addAuthor(new Author('Åge Åli'));
        manyAuthorsBook.addAuthor(new Author('Åle Ånke'));
        manyAuthorsBook.setPublicationPlace('Oslo');
        references.push(manyAuthorsBook);
   
        var ntnu = new Website('http://ntnu.no', 'Norges teknisk-naturvitenskaplige universitet'); 
        ntnu.addAuthor(new Author('Gunnar Bovim')); 
        references.push(ntnu);
    });

   
    it('should sort the references alphabetically by surname', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.getReferences()[0].getAuthors()[0].getSurname(), 'Bick'); 
        assert.equal(bibliography.getReferences()[1].getAuthors()[0].getSurname(), 'Bovim'); 
        assert.equal(bibliography.getReferences()[2].getAuthors()[0].getSurname(), 'Dawkins'); 
        assert.equal(bibliography.getReferences()[3].getAuthors()[0].getSurname(), 'Dybvig'); 
        assert.equal(bibliography.getReferences()[4].getAuthors()[0].getSurname(), 'Smith'); 
    });

    it('should format a single author as => Surname, F.', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(0), 'Bick, J.');
    });
    
    it('should format a forename consisting of two names correctly', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(4), 'Smith, R.B.');
    });
    
    it('should separate two authors with "og" (and)', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(3), 'Dybvig, D.D. og Dybvig, M.');
    });
    
    it('should separate the last author with "og" (and)', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(3), 'Dybvig, D.D. og Dybvig, M.');
    });
    
    it('should separate first authors with comma and the last author with "og" (and)', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(5), 'Ågesen, Å., Åli, Å. og Ånke, Å.');
    });

    it('should correctly display publication year in parenthesis', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.yearFormat(2), '(2006)');
    });
    
    it('should correctly display publication year in parenthesis', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.yearFormat(3), '(2004)');
    });
    
    it('should italize the book title', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.titleFormat(2), '<em>The God Delusion</em>');
    });
    
    it('should italize the website title', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.titleFormat(1).indexOf('<em>'),   0);
        assert.equal(bibliography.titleFormat(1).substring(bibliography.titleFormat(1).length - '</em>'.length), '</em>'); 
    });
    
    it('should append colon to publication place', function () {
        var bibliography = new Harvard(references);
        bibliography.sort();
        
        assert.equal(bibliography.placeFormat(5), 'Oslo:');
    });
});
