var database         = require('../bootstrap.js');
var AuthorFactory    = require('./author.js');
var ReferenceFactory = require('./reference.js');
var Author           = require('../../models/author.js');
var Website          = require('../../models/website.js');

var WebsiteFactory = {
    
    constructWebsite: function (row) {
        var website = new Website(row.url);
        website.setId(row.id);
        website.setTitle(row.title);
        website.setURL(row.url);
        website.setPublicationDate(row.publication_date);
        return website;
    },

    read: function (id, done) {
        var self = this;
        database.query('SELECT * FROM Websites ' +
            'JOIN `References` ON Websites.reference_id = References.id ' +
            'WHERE Websites.reference_id = ?', id,
        function (err, rows, fields) {
            if (err) return done(err);

            var row = rows[0];
            var website = self.constructWebsite(row);
            AuthorFactory.read(row.reference_id, function (authors) {
                website.addAuthors(authors);
                done(undefined, website);
            });
        });
    },

    create: function (website, done) {
        var self = this;

        ReferenceFactory.create(website.getTitle(), function (ReferenceResult) {
            var referenceId = ReferenceResult.insertId;

            database.query('INSERT INTO Websites SET ?', {
                reference_id:      referenceId,
                url:               website.getURL(),
                publication_date:  website.getPublicationDate(),
            }, function (err, rows, fields) {
                if (err) return done(err);
                var authors = website.getAuthors();
                return AuthorFactory.createAuthors(referenceId, authors, done);
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

module.exports = WebsiteFactory;
