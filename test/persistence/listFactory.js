var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');
var Book        = require('../../models/book.js');
var Website     = require('../../models/website.js');
var Author      = require('../../models/author.js');
var List        = require('../../models/list.js');
var ListFactory = require('../../database/factories/list.js');

describe('listFactory', function () {

    describe('Book', function () {

        it('creates a list entry in the database with a book', function (done) {
            var list = new List();
            var book = new Book();
            book.setId(1);
            list.addReference(book);
            ListFactory.create(list, function (err, list) {
                if (err) throw err;
                assert.equal(list.getBibliographyStyle(), 'harvard1.csl');
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

        it('can add contents in an existing list by adding the previously removed book', function (done) {
            ListFactory.read(1, function (err, list) {
                assert.equal(list.getReferences().length, 0);
                var book = new Book();
                book.setId(1);
                list.addReference(book);

                ListFactory.update(list, function (err, updatedList) {
                    assert.equal(updatedList.getReferences().length, 1); 
                    done();
                });
            });
        });

        it('can change the bibliography style upon update', function (done) {
            ListFactory.read(1, function (err, list) {
                list.setBibliographyStyle('chicago.csl');
                ListFactory.update(list, function (err, updatedList) {
                    assert.equal(updatedList.getBibliographyStyle(), 'chicago.csl'); 
                    done();
                });
            });
        });
    });
    
    describe('Website', function () {

        it('creates a list entry in the database with proper content', function (done) {
            var list = new List();
            var website = new Website();
            website.setId(2);
            list.addReference(website);
            ListFactory.create(list, function (err, list) {
                if (err) throw err;
                done();
            });
        });

        it('reads back the inserted list with correct content', function (done) {
            ListFactory.read(2, function (err, list) {
                assert.equal(list.getReferences().length, 1);
                assert.equal(list.getReferences()[0].getURL(), 'http://vg.no');
                done();
            });
        });
    });
}); 
