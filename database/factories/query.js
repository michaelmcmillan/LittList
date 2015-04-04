var database = require('../bootstrap.js');
var BookFactory = require('./book.js');

var QueryFactory = {

    read: function (search, type, done) {
        var types = ['book', 'website'];
        type = type.toLowerCase();
        if (types.indexOf(type) === -1)
            return done([]);

        database.query('SELECT id FROM Queries ' +
            'WHERE search = ?', [search],
        function (err, rows, fields) {
            if (err) return done(err);
            if (rows.length === 0) return done([]); 

            var referenceIds = [];
            rows.forEach(function (row) {
                referenceIds.push(row.id);
            });

            if (type === 'book')
                BookFactory.readAll(referenceIds, done);
        });
    },

    create: function (search, done) {
        var self = this;
        database.query('INSERT INTO Queries SET ?', {
            search: search,
        }, function (err, result) {
            if (err) return done(err);
            self.read(search, 'book', done);
        });
    }
}

module.exports = QueryFactory;
