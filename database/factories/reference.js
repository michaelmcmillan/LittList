var database = require('../bootstrap.js');

var ReferenceFactory = {
    create: function (title, cb) {
        database.query('INSERT INTO `References` SET ?', {
            title: title 
        }, function (err, result) {
            if (err) throw (err);
            cb(result);
        });
    }
} 

module.exports = ReferenceFactory;

