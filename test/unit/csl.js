var assert = require('assert');
var Book   = require('../../models/book.js');
var Author = require('../../models/author.js');
var CSLConverter = require('../../models/csl.js');

describe('CSL-JSON', function () {

    it('should use the id of the book when extracting a Book model', function () {
        var book = new Book().setId(1);
        assert.notEqual(CSLConverter(book)[1], undefined);
    });

    it('should pass on the title of the book to the title property', function () {
        var book = new Book('Snømannen').setId(1);
        assert.equal(CSLConverter(book)[1].title, 'Snømannen');
    });

    it('should have book as type when provided a book', function () {
        var book = new Book('Snømannen').setId(1);
        assert.equal(CSLConverter(book)[1].type, 'book');
    });

    it('should have the books publication as publisher', function () {
        var book = new Book('Snømannen').setId(1);
        book.setPublisher('Times Magazine');
        assert.equal(CSLConverter(book)[1].publisher, 'Times Magazine');
    });

    it('should have the publication place as the publisher-place', function () {
        var book = new Book('Snømannen').setId(1);
        book.setPublicationPlace('Oslo');
        assert.equal(CSLConverter(book)[1]['publisher-place'], 'Oslo');
    });

    it('should store authors as an array consisting of author objects', function () {
        var book = new Book('Snømannen').setId(1);
        book.addAuthor(new Author('Jo Nesbø'));
        assert.equal(CSLConverter(book)[1].author.length, 1);
    });

    it('should store authors forename as given (name)', function () {
        var book = new Book('Snømannen').setId(1);
        book.addAuthor(new Author('Jo Nesbø'));
        assert.equal(CSLConverter(book)[1].author[0].given, 'Jo');
    });

    it('should store authors surname as family (name)', function () {
        var book = new Book('Snømannen').setId(1);
        book.addAuthor(new Author('Jo Nesbø'));
        assert.equal(CSLConverter(book)[1].author[0].family, 'Nesbø');
    });
});
