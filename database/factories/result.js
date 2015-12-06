var database = require('../bootstrap.js');

var ResultFactory = {

    create: function (query_id, reference_id, done) {
        database.query('INSERT INTO Results SET ?', {
            query_id: query_id,
            reference_id: reference_id
        }, function (err, result) {
            if (err) return done(err);
            done(undefined, result);
        });
    }
}

module.exports = ResultFactory;
