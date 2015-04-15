var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');
var Book        = require('../../models/book.js');
var Author      = require('../../models/author.js');
var Harvard     = require('../../bibliographies/harvard/harvard.js');
var List        = require('../../models/list.js');
var ListFactory = require('../../database/factories/list.js');

describe('listFactory', function () {

    it('creates a list entry in the database with proper content', function (done) {
        var bibliography = new Harvard();
        var list = new List(bibliography);
        var book = new Book('Snømannen');
        book.setId(1);

        list.addReference(book);
        ListFactory.create(list, function (err, book) {
            done();
        });
    });

    it('reads back the inserted list with correct content', function (done) {
        ListFactory.read(1, function (err, list) {
            assert.equal(list.getReferences().length, 1);
            assert.equal(list.getUrl().length >= 5, true);
            done();
        });
    });
    
    it('reads the authors name from the book in the list', function (done) {
        ListFactory.read(1, function (err, list) {
            assert.equal(list.getReferences()[0].getTitle(), 'Snømannen');
            done();
        });
    });
}); 
