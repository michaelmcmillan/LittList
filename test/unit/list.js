var assert  = require('assert');
var Book    = require('../../models/book.js');
var Website = require('../../models/website.js');
var Author  = require('../../models/author.js');
var List    = require('../../models/list.js');
var Harvard = require('../../bibliographies/harvard/harvard.js');

describe('List', function () {
    
    it('should have a setter and getter for a unique id', function () {
        var list = new List();
        list.setId(1);
        assert.equal(list.getId(), 1);
    });

    it('should be possible to change the id', function () {
        var list = new List();
        list.setId(1);
        assert.equal(list.getId(), 1);
        list.setId(2);
        assert.equal(list.getId(), 2);
    });

    it('should generate a unique url upon creation of length 5', function () {
        var list = new List(); 
        assert.equal(new List().getUrl().length >= 5, true);
    });

    it('should not be a collision in urls', function () {
        var urls = [];
        [new List(), new List(), new List()].forEach(function (currentList) {
            assert.equal(urls.indexOf(currentList.getUrl()), -1); 
            urls.push(currentList.getUrl());
        });
    });
    
    it('should be possible to add a book to the list', function () {
        var book = new Book('Elling');
        var list = new List();
        list.addReference(book);
        assert.equal(list.getReferences().length, 1);
    });

    it('should be possible to add a website to the list', function () {
        var website = new Website('http://vg.no');
        var list = new List();
        list.addReference(website);
        assert.equal(list.getReferences().length, 1);
    });
    
    it('should be possible to remove a reference from the list', function () {
        var website = new Website('http://vg.no');
        website.setId(1);

        var book    = new Book('Elling');
        book.setId(2);

        var list = new List();
        list.addReference(website);
        list.addReference(book);
        
        list.removeReference(book);

        assert.equal(list.getReferences().length, 1);
        assert.equal(list.getReferences()[0], website);
    });

    it('should have a createdAt attribute upon creation that is now', function () {
        assert.equal(new List().getCreatedAt().toString(), new Date().toString());
    });
    
    it('should use Harvard as the default bibliography style', function () {
        var list = new List(); 
        assert.equal(list.getBibliographyStyle(), 'Harvard');
    });

    xit('should be possible to change the bibliography style', function () {
        // Have a method in list.js ie. changeBibliography() which yanks out
        // references in the current list and adds them to the new one.
        // Finally it should set the internal bibliography to the new one.
        
        // *READ* This is not implemented because there is only one bib.
    });
});

