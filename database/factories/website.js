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
                AuthorFactory.createAuthors(referenceId, authors, function (referenceId) {
                    return self.read(referenceId, done);
                }); 
            });
        });
    },

    readAll: function (referenceIds, done) {
        var self = this;
        var websites = [];
        if (referenceIds.length === 0)
            return done(undefined, []);

        database.query('SELECT * FROM Websites ' +
        'JOIN `References` ON Websites.reference_id = References.id ' +
        'WHERE Websites.reference_id in (?)', [referenceIds],
        function (err, rows, fields) {
            rows.forEach(function (row) {
                var website = self.constructWebsite(row);
                AuthorFactory.read(row.reference_id, function (authors) {
                    referenceIds.pop();
                    website.addAuthors(authors);
                    websites.push(website);
                    if (referenceIds.length === 0)
                        return done(undefined, websites);
                });
            }); 
        });
    },

    createAll: function (websites, done) {
        var self = this;

        if (websites.length === 0) return done();

        var referenceIds = [];
        for (i = 0; i < websites.length; i++) {
            this.create(websites[i], function (referenceId) {
                referenceIds.push(referenceId);
                websites.pop();
                if (websites.length === 0)
                    self.readAll(referenceIds, done);
            });
        }
    }
}

module.exports = WebsiteFactory;
