var database = require('../bootstrap.js');
var BookFactory = require('./book.js');

var QueryFactory = {

    read: function (search, type, done) {
        var self = this;

        var types = ['book', 'website'];
        type = type.toLowerCase();
        if (types.indexOf(type) === -1)
            return done(new Error('Ugyldig referansetype.'));

        database.query('SELECT id FROM Queries ' +
            'WHERE search = ?', search,
        function (err, rows, fields) {
            if (err) return done(err);
            if (rows.length === 0)
                return done(undefined, []); 
            var row = rows[0]; 

            self.getResults(row.id, type, function (err, referenceIds) {
                if (err) throw err;

                if (type === 'book')
                    return BookFactory.readAll(referenceIds, done);
            });
        });
    },

    getResults: function (query_id, type, done) {
        database.query('SELECT * FROM Results ' +
            'WHERE query_id = ?', query_id,
        function (err, rows, fields) {
            if (err) return done(err);
            if (rows.length === 0)
                return done(undefined, []);
            
            var referenceIds = [];
            rows.forEach(function (row) {
                referenceIds.push(row.reference_id); 
            }); 
            return done(undefined, referenceIds);
        }); 
    },
    
    create: function (search, references, done) {
        var self = this;
        database.query('INSERT INTO Queries SET ?', {
            search: search,
        }, function (err, result) {
            if (err) return done(err);
            
            var queryId = result.insertId;
            references.forEach(function (reference) {
                database.query('INSERT INTO Results ' + 
                    'SET ?', {
                    query_id: queryId,
                    reference_id: reference.getId() 
                }, function (err, result) {
                    if (err) return done(err);
                    references.pop();
                    if (references.length === 0)
                        return done();
                });
            });
        });
    }
}

module.exports = QueryFactory;
