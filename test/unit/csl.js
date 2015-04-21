var assert = require('assert');
var Book   = require('../../models/book.js');
var CSLConverter = require('../../models/cls.js');

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
        book.setPublicationPlace('Times Magazine');
        assert.equal(CSLConverter(book)[1].publisher, 'Times Magazine');
    });
});
