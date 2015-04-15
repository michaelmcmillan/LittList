var database         = require('../bootstrap.js');
var Author           = require('../../models/author.js');
var Book             = require('../../models/book.js');
var List             = require('../../models/list.js');
var AuthorFactory    = require('./author.js');
var ReferenceFactory = require('./reference.js');
var BookFactory      = require('./book.js');

var ListFactory = {
    
    // Retrieves the list contents by using
    // multiple statements. The returned results
    // are divided into two groups respectivly:
    // Books & Websites.
    read: function (id, done) {
        var self = this;
        database.query(
            'SELECT * FROM Contents ' +
            'JOIN `References` ON Contents.reference_id = References.id ' +
            'JOIN `Lists` ON Contents.list_id = Lists.id ' +
            'WHERE Lists.id = ?', id,
        function (err, rows, fields) {
            if (err) return done(err);

            var referenceIds = [];
            rows.forEach(function (row) {
                referenceIds.push(row.id);
            });
            
            var list = new List();
            list.setUrl(rows[0].url);
            BookFactory.readAll(referenceIds, function (err, books) {
                if (err) return done(err);

                books.forEach(function (book) {
                    list.addReference(book);
                });
                return done(undefined, list);
            });
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

            // Link the contents (referenceIds) to the list
            var contentEntries = [];
            list.getReferences().forEach(function (reference) {
                contentEntries.push([list_id, reference.getId()]);
            });
            
            // Execute query by inserting contentEntries
            database.query('INSERT INTO Contents ' + 
            '(list_id, reference_id) VALUES ?', 
            [contentEntries], function (err, rows, field) {
                if (err) return done(err);
                done();
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
}

module.exports = ListFactory;
