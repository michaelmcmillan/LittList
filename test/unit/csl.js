var assert = require('assert');
var Book   = require('../../models/book.js');
var List   = require('../../models/list.js');
var Author = require('../../models/author.js');
var CSLConverter = require('../../models/csl.js');

describe('CSL-JSON', function () {

    it('should use the id of the book when extracting a Book model', function () {
        var book = new Book().setId(1);
        var list = new List();
        list.addReference(book);
        assert.notEqual(CSLConverter(list)[1], undefined);
    });

    it('should pass on the title of the book to the title property', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        list.addReference(book);
        assert.equal(CSLConverter(list)[1].title, 'Snømannen');
    });

    it('should have book as type when provided a book', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        list.addReference(book);
        assert.equal(CSLConverter(list)[1].type, 'book');
    });

    it('should have the books publication as publisher', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        book.setPublisher('Times Magazine');
        list.addReference(book);
        assert.equal(CSLConverter(list)[1].publisher, 'Times Magazine');
    });

    it('should have the publication place as the publisher-place', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        book.setPublicationPlace('Oslo');
        list.addReference(book);
        assert.equal(CSLConverter(list)[1]['publisher-place'], 'Oslo');
    });

    it('should store authors as an array consisting of author objects', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        book.addAuthor(new Author('Jo Nesbø'));
        list.addReference(book);
        assert.equal(CSLConverter(list)[1].author.length, 1);
    });

    it('should store authors forename as given (name)', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        book.addAuthor(new Author('Jo Nesbø'));
        list.addReference(book);
        assert.equal(CSLConverter(list)[1].author[0].given, 'Jo');
    });

    it('should store authors surname as family (name)', function () {
        var book = new Book('Snømannen').setId(1);
        var list = new List();
        book.addAuthor(new Author('Jo Nesbø'));
        list.addReference(book);
        assert.equal(CSLConverter(list)[1].author[0].family, 'Nesbø');
    });

    it('should store multiple references', function () {
        var firstBook  = new Book('Snømannen').setId(1);
        var secondBook = new Book('Hodejegerne').setId(2);
        var list = new List();
        list.addReference(firstBook);
        list.addReference(secondBook);
        assert.equal(Object.keys(CSLConverter(list)).length, 2);
    });
});
