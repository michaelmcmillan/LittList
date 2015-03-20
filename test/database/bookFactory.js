var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');
var Book        = require('../../models/book.js');
var BookFactory = require('../../database/factories/book.js');

describe('bookFactory', function () {
    it('changes database to the testdatabase', function (done) {
        BookFactory.database.changeUser({
            database: config.database.test_database
        }, function (err) {
            done();
        });
    });

    it('creates a book entry in the database', function (done) {
        var book = new Book('Snømannen');
        book.setPublicationPlace('Oslo');
        BookFactory.create(book, function (book) {
            done();
        });
    });

    it('reads the created book back from the database', function (done) {
        BookFactory.read(1, function (book) {
            assert.equal(book.getTitle(), 'Snømannen');
            done();
        });
    });
}); 
