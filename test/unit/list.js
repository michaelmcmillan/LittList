var assert  = require('assert');
var Book    = require('../../models/book.js');
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

    it('throws exception if bibliography provided is not a bibliography', function () {
        assert.throws(function () {
            new List([]);
        });
    });

    it('does not throw exception if bibiliography is a bibliography', function () {
        assert.doesNotThrow(function () {
            new List(new Harvard());
        });
    });

    it('does not throw exception if no bibiliography is added at all', function () {
        assert.doesNotThrow(function () {
            new List();
        });
    });

    it('should delegate getReferences to the internal bibiliography', function () {
        var bibliography = new Harvard();
        var list = new List(bibliography);
        assert.equal(list.getReferences().length, 0);
    });

    it('should delegate addReference to the internal bibiliography', function () {
        var bibliography = new Harvard();
        var list = new List(bibliography);
        list.addReference(new Book());
        assert.equal(list.getReferences().length, 1);
    });

    it('should have a createdAt attribute upon creation that is now', function () {
        assert.equal(new List().getCreatedAt().toString(), new Date().toString());
    });

    xit('should be possible to change the bibliography style', function () {
        // Have a method in list.js ie. changeBibliography() which yanks out
        // references in the current list and adds them to the new one.
        // Finally it should set the internal bibliography to the new one.
    });
});

