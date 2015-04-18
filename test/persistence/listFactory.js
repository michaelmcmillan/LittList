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
        var list = new List();
        list.addReference(1);
        ListFactory.create(list, function (err, book) {
            if (err) throw err;
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
    
    xit('reads the authors name from the book in the list', function (done) {
        ListFactory.read(1, function (err, list) {
            assert.equal(list.getBibliography()[0].getTitle(), 'Snømannen');
            done();
        });
    });

    it('can remove contents in an existing list', function (done) {
        ListFactory.read(1, function (err, list) {
            assert.equal(list.getReferences().length, 1); 
            list.removeReference(1);

            ListFactory.update(list, function (err, updatedList) {
                assert.equal(updatedList.getReferences().length, 0);
                done();
            });
        });
    });

    it('can add contents in an existing list', function (done) {
        ListFactory.read(1, function (err, list) {
            assert.equal(list.getReferences().length, 0);
            list.addReference(1);

            ListFactory.update(list, function (err, updatedList) {
                assert.equal(updatedList.getReferences().length, 1); 
                done();
            });
        });
    });
}); 
