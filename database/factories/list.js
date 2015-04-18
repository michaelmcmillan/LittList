var database         = require('../bootstrap.js');
var Author           = require('../../models/author.js');
var Book             = require('../../models/book.js');
var List             = require('../../models/list.js');
var AuthorFactory    = require('./author.js');
var ReferenceFactory = require('./reference.js');
var BookFactory      = require('./book.js');

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

var ListFactory = {
    
    // Retrieves the list contents by using
    // multiple statements. The returned results
    // are divided into two groups respectivly:
    // Books & Websites.
    read: function (id, done) {
        var self = this;
        database.query('SELECT * FROM Lists ' + 
            'WHERE id = ?', id,
        function (err, rows, fields) {
            if (err) return done(err);

            var row = rows[0];
            var list = new List();
            list.setId(row.id);
            list.setUrl(row.url);
            
            database.query('SELECT * FROM Contents ' +
                'JOIN `References` ON Contents.reference_id = References.id ' +
                'JOIN `Lists` ON Contents.list_id = Lists.id ' +
                'WHERE Lists.id = ?', row.id,
            function (err, rows, fields) {
                if (err) return done(err);

                var referenceIds = [];
                rows.forEach(function (row) {
                    referenceIds.push(row.reference_id);
                });

                BookFactory.readAll(referenceIds, function (err, books) {
                    if (err) return done('book', referenceIds, err);

                    books.forEach(function (book) {
                        list.addReference(book);
                    });
                    
                    return done(undefined, list);
                });
            });
        });
    },
    
    update: function (list, done) {
        var self = this;       
        
        self.read(list.getId(), function (err, readList) {
            if (err) return done(err);            
 
            // Differentiate between whats stored and whats not
            var contentInDatabase = readList.getReferences();
            var passedInContent   = list.getReferences();
            
            // Find the diff between content passed and content in db
            var added   = passedInContent.diff(contentInDatabase);
            var removed = contentInDatabase.diff(passedInContent);

            // Async queue
            var queue = 0;

            // Delete the removed references
            if (removed.length !== 0) {
                queue++;
                database.query('DELETE FROM Contents ' + 
                    'WHERE list_id = ' + database.escape(list.getId()) + ' ' +  
                    'AND reference_id IN (?)', removed,
                function (err, rows, fields) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(list.getId(), done);
                });         
            }

            var contentEntries = [];
            added.forEach(function (add) {
                contentEntries.push([list.getId(), add]);
            });
 
            // Execute query by inserting contentEntries
            if (contentEntries.length !== 0) {
                queue++;
                database.query('INSERT INTO Contents ' + 
                    '(list_id, reference_id) VALUES ?', 
                [contentEntries], function (err, rows, field) {
                    if (err) return done(err);
                    if (--queue === 0)
                        return self.read(list.getId(), done);
                });
            }
        }); 
    },

    create: function (list, done) {
        var self = this;
        
        // Create the actual List entry
        database.query('INSERT INTO Lists SET ?', {
            url: list.getUrl()
        }, function (err, rows, field) {
            
            // Get the id from the created list
            var list_id = rows.insertId;

            // If no contents return the list id
            if (list.getReferences().length === 0)
                return done(undefined, list_id);

            // Link the contents (referenceIds) to the list
            var contentEntries = [];
            list.getReferences().forEach(function (reference_id) {
                contentEntries.push([list_id, reference_id]);
            });
            
            // Execute query by inserting contentEntries
            database.query('INSERT INTO Contents ' + 
                '(list_id, reference_id) VALUES ?', 
            [contentEntries], function (err, rows, field) {
                if (err) return done(err);
                return self.read(list_id, done);
            });
        });
    },

    /*
    readAll: function (referenceIds, done) {
        var self = this;
        var books = [];
        if (referenceIds.length === 0)
            return done(undefined, []);

        database.query('SELECT * FROM Books ' +
        'JOIN `References` ON Books.reference_id = References.id ' +
        'WHERE Books.reference_id in (?)', [referenceIds],
        function (err, rows, fields) {
            rows.forEach(function (row) {
                var book = self.constructBook(row);
                AuthorFactory.read(row.reference_id, function (authors) {
                    referenceIds.pop();
                    book.addAuthors(authors);
                    books.push(book);
                    if (referenceIds.length === 0)
                        return done(undefined, books);
                });
            }); 
        });
    },

    create: function (book, done) {
        var self = this;

        ReferenceFactory.create(book.raw().title, function (ReferenceResult) {
            var referenceId = ReferenceResult.insertId;

            database.query('INSERT INTO Books SET ?', {
                reference_id:      referenceId,
                publisher:         book.raw().publisher,
                publication_year:  book.raw().publicationYear,
                publication_place: book.raw().publicationPlace,
                isbn:              book.raw().ISBN,
                edition:           book.raw().edition
            }, function (err, BookResult) {
                if (err) return done(err);
                var authors = book.raw().authors;
                AuthorFactory.createAuthors(referenceId, authors, done);
            });
        });
    },

    createAll: function (books, done) {
        var self = this;

        if (books.length === 0) return done();

        var referenceIds = [];
        for (i = 0; i < books.length; i++) {
            this.create(books[i], function (referenceId) {
                referenceIds.push(referenceId);
                books.pop();
                if (books.length === 0)
                    self.readAll(referenceIds, done);
            });
        }
    }
    */

    diff: function (firstContent, secondContent) {
        var onlyInFirst = firstContent.filter(function(current){
            return secondContent.filter(function(current_b){
                return current_b == current
            }).length == 0
        });

        var onlyInSecond = secondContent.filter(function(current){
            return firstContent.filter(function(current_a){
                return current_a == current
            }).length == 0
        });             

        return onlyInFirst.concat(onlyInSecond);
    },
}

module.exports = ListFactory;
