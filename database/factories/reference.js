var database = require('../bootstrap.js');

var p1 = new Promise(function(resolve, reject) {
  resolve("Success!");
});

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

