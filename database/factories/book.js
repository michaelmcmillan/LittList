var database = require('../bootstrap.js');
var Author     = require('../../models/author.js');
var Book     = require('../../models/book.js');
var AuthorFactory = require('./author.js');
var ReferenceFactory = require('./reference.js');

var BookFactory = {

    read: function (id, done) {
        database.query('SELECT * FROM Books ' +
            'JOIN `References` ON Books.reference_id = References.id ' +
            'WHERE Books.reference_id = ?', id,
        function (err, rows, fields) {
            if (err) return done(err);

            var row = rows[0];
            var book = new Book(row.title);
            book.setId(row.id);
            book.setISBN(row.ISBN);
            book.setEdition(row.edition);
            book.setPublisher(row.publisher);
            book.setPublicationPlace(row.publication_place);
            AuthorFactory.read(row.reference_id, function (authors) {
                book.addAuthors(authors);
                done(undefined, book);
            });
        });
    },

    readAll: function (referenceIds, done) {
        var self = this;
        var books = [];
        if (referenceIds.length === 0)
            return done(undefined, []);

        for (i = 0; i < referenceIds.length; i++) {
            self.read(referenceIds[i], function (err, book) {
                if (err) return done(err);
                books.push(book);
                referenceIds.pop();
                if (referenceIds.length === 0)
                    return done(undefined, books);
            });
        }
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
}

module.exports = BookFactory;
