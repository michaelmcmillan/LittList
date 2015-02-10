var assert  = require('assert');
var Harvard = require('../bibliographies/harvard.js');
var Book    = require('../book.js');
var Author  = require('../author.js');

describe('bibliography#harvard', function () {
    
    var books = [];

    before(function () {
        var exphil = new Book('Det tenkende mennesket');
        exphil.addAuthor(new Author('Dagfinn Døhl Dybvig'));
        exphil.addAuthor(new Author('Magne Dybvig'));
        exphil.setPublicationYear(2004);
        books.push(exphil);
        
        var internetLaw = new Book('101 Things You Need To Know about Internet Law');
        internetLaw.addAuthor(new Author('Jonathan Bick'));
        books.push(internetLaw);
        
        var theGodDelusion = new Book('The God Delusion');
        theGodDelusion.addAuthor(new Author('Richard Dawkins'));
        theGodDelusion.setPublicationYear(2006);
        books.push(theGodDelusion);
        
        var fakeyBook = new Book('The Fake Book');
        fakeyBook.addAuthor(new Author('Richard Brandson Smith'));
        books.push(fakeyBook);
        
        var manyAuthorsBook = new Book('A lot of authors');
        manyAuthorsBook.addAuthor(new Author('Åslaug Ågesen'));
        manyAuthorsBook.addAuthor(new Author('Åge Åli'));
        manyAuthorsBook.addAuthor(new Author('Åle Ånke'));
        manyAuthorsBook.setPublicationPlace('Oslo');
        books.push(manyAuthorsBook);
    });

    it('should sort the references alphabetically by surname', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.getBooks()[0].getAuthors()[0].getName(), 'Jonathan Bick'); 
        assert.equal(bibliography.getBooks()[1].getAuthors()[0].getName(), 'Richard Dawkins'); 
        assert.equal(bibliography.getBooks()[2].getAuthors()[0].getName(), 'Dagfinn Døhl Dybvig'); 
        assert.equal(bibliography.getBooks()[3].getAuthors()[0].getName(), 'Richard Brandson Smith'); 
    });

    it('should format a single author as => Surname, F.', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(0), 'Bick, J.');
    });
    
    it('should format a forename consisting of two names correctly', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(3), 'Smith, R.B.');
    });
    
    it('should separate two authors with "og" (and)', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(2), 'Dybvig, D.D. og Dybvig, M.');
    });
    
    it('should separate the last author with "og" (and)', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(2), 'Dybvig, D.D. og Dybvig, M.');
    });
    
    it('should separate first authors with comma and the last author with "og" (and)', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.authorFormat(4), 'Ågesen, Å., Åli, Å. og Ånke, Å.');
    });

    it('should correctly display publication year in parenthesis', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.yearFormat(1), '(2006)');
    });
    
    it('should correctly display publication year in parenthesis', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.yearFormat(2), '(2004)');
    });
    
    it('should italize title', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.titleFormat(1), '<em>The God Delusion</em>');
    });
    
    it('should append colon to publication place', function () {
        var bibliography = new Harvard(books);
        bibliography.sort();
        
        assert.equal(bibliography.placeFormat(4), 'Oslo:');
    });

});
