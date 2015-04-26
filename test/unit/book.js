var assert  = require('assert');
var Book    = require('../../models/book.js');
var Author  = require('../../models/author.js'); 

describe('book', function () {
   it('should be able to be created', function () {
        var book = new Book('Title');
        assert.equal(book instanceof Book, true);
   }); 

   it('should have a title', function () {
        var book = new Book('Title');
        assert.equal(book.getTitle(), 'Title');
   }); 

   it('should use empty string as title if no title is provided in constructor', function () {
        var book = new Book();
        assert.equal(book.getTitle(), '');
   }); 

   it('should not throw exception if the title provided is null', function () {
        assert.doesNotThrow(function () {
            var book = new Book(null);
        });
   }); 
   
   it('should have another title', function () {
        var book = new Book('Snømannen');
        assert.equal(book.getTitle(), 'Snømannen');
   }); 
   
   it('should strip all trailing whitespace from the title', function () {
        var book = new Book('Det Du Ikke Får Vite Om Maten Din  ');
        assert.equal(book.getTitle(), 'Det Du Ikke Får Vite Om Maten Din');
   }); 

   it('should have a year of publication', function () {
        var book = new Book('Snømannen');
        book.setPublicationYear(2007);
        assert.equal(book.getPublicationYear(), 2007);
   }); 
   
   it('should have no authors when no author is added', function () {
        var book = new Book('Title');
        assert.equal(book.getAuthors().length, 0)
   });     
   
   it('should have at least one author when an author is added', function () {
        var book = new Book('Title');
        book.addAuthor(new Author('Jo Nesbø'));
        assert.equal(book.getAuthors().length, 1)
   }); 
   
   it('should have a place where the book was published', function () {
        var book = new Book('Snømannen');
        book.setPublicationPlace('Oslo');
        assert.equal(book.getPublicationPlace(), 'Oslo');
   }); 

   it('should include letters like "æ", "ø" and "å" in publication place', function () {
        var book = new Book('Snømannen');
        book.setPublicationPlace('Århækkestød');
        assert.equal(book.getPublicationPlace(), 'Århækkestød');
   }); 

   it('should keep whitespace in name', function () {
        var book = new Book('4 hour work week');
        book.setPublicationPlace('New York');
        assert.equal(book.getPublicationPlace(), 'New York');
   }); 
   
   it('should strip away any non-alphanumerical chars from pub.place', function () {
        var book = new Book('Snømannen');
        book.setPublicationPlace('[Oslo]*¨^!#"');
        assert.equal(book.getPublicationPlace(), 'Oslo');
   }); 
   
   it('should only allow numbers as the publication year', function () {
        var book = new Book('Snømannen');
        book.setPublicationYear('2015///');
        assert.equal(book.getPublicationYear(), '2015');

        book.setPublicationYear('.2015///');
        assert.equal(book.getPublicationYear(), '2015');
   });

   it('should have an edition number', function () {
        var book = new Book('Det tenkende mennesket');
        book.setEdition('2. utg.');
        assert.equal(book.getEdition(), '2. utg.');
   }); 
   
   it('should accept ISBN-13 codes', function () {
        var book = new Book('Det tenkende mennesket');
        book.setISBN('9788251918640');
        assert.equal(book.getISBN(), '9788251918640');
   }); 
   
   it('should successfully add multiple authors with addAuthors (plural)', function () {
        var book = new Book('Title');
        book.addAuthors([new Author('Jo Nesbø'), new Author('Dagfinn Dybdahl')]);
        assert.equal(book.getAuthors().length, 2)
   }); 

    it('should be possible to chain creation of new book and setId', function () {
        var book = new Book('Snømannen').setId(1);      
        assert.equal(book.getId(), 1);
    });
});
