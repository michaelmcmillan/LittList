var database = require('../bootstrap.js');
var Author   = require('../../models/author.js');

var AuthorFactory = {

    read: function (id, cb) {
        database.query('SELECT * FROM Authors ' +
            'WHERE Authors.reference_id = ?', id,
        function (err, rows, fields) {
            if (err) throw err;
            var authors = [];
            rows.forEach(function (row) {
                authors.push(new Author(row.name));
            });
            cb(authors);
        });
    },

    create: function (reference_id, author, cb) {
        database.query('INSERT INTO Authors SET ?', {
            reference_id: reference_id,
            name: author.raw().name,
        }, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    createAuthors: function (referenceId, authors, done) {
        if (authors.length === 0) return done(referenceId);
        for (i = 0; i < authors.length; i++) {
            this.create(referenceId, authors[i], function () {
                authors.pop();
                if (authors.length === 0) done(referenceId); 
            });
        }
    },
}

module.exports = AuthorFactory;
