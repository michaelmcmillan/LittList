var database = require('../bootstrap.js');
var BookFactory = require('./book.js');

var QueryFactory = {

    read: function (search, type, done) {
        var types = ['book', 'website'];
        type = type.toLowerCase();
        if (types.indexOf(type) === -1) {
            done([]);
            return false;
        }

        database.query('SELECT id FROM Queries ' +
            'WHERE search = ?', [search],
        function (err, rows, fields) {
            if (err) throw err;
            
            var referenceIds = [];
            rows.forEach(function (row) {
                referenceIds.push(row.id);
            });

            if (type === 'book')
                BookFactory.readAll(referenceIds, done);
        });
    },

    create: function (search, done) {
        database.query('INSERT INTO Queries SET ?', {
            search: search,
        }, function (err, result) {
            if (err) throw err;
            done(result);
        });
    }
}

QueryFactory.read('det tenkende mennesket', 'book', function (e) {
    console.log(e);
});

module.exports = QueryFactory;
