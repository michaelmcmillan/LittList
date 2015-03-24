var database = require('../bootstrap.js');

var QueryFactory = {
    database: database,

    read: function (search, cb) {
        database.query('SELECT * FROM Queries ' +
            'JOIN Results on Results.query_id = Queries.id ' + 
            'JOIN `References` on Results.reference_id = `References`.id ' +
            'WHERE search = "?"', search,
        function (err, rows, fields) {
            if (err) throw err;
            cb(rows);
        });
    },

    create: function (search, cb) {
        database.query('INSERT INTO Queries SET ?', {
            search: search,
        }, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = QueryFactory;
