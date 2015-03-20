var database = require('../bootstrap.js');
var Author   = require('../../models/author.js');

var AuthorFactory = {

    read: function (id, cb) {
        database.query('SELECT * FROM Authors ' +
            'WHERE Authors.reference_id = ?', id,
        function (err, rows, fields) {
            var authors = [];
            rows.forEach(function (row) {
                authors.push(new Author(row.forename + ' ' + row.surname));
            });
            cb(authors);
        });
    }
}

module.exports = AuthorFactory;
