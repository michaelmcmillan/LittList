var database = require('../bootstrap.js');
var Author   = require('../../models/author.js');

var AuthorFactory = {
    database: database,

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
    }
}

module.exports = AuthorFactory;
