var database = require('../bootstrap.js');

var ResultFactory = {

    create: function (query_id, reference_id, cb) {
        database.query('INSERT INTO Results SET ?', {
            query_id: query_id,
            reference_id: reference_id
        }, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
}

module.exports = ResultFactory;
