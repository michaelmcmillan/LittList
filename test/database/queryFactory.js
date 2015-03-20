var assert       = require('assert');
var mysql        = require('mysql');
var config       = require('../../config.js');
var QueryFactory = require('../../database/factories/query.js');
var ResultFactory = require('../../database/factories/result.js');

describe('queryFactory', function () {
    it('changes database to the testdatabase', function (done) {
        QueryFactory.database.changeUser({
            database: config.database.test.database
        }, function (err) {
            done();
        });
    });
    
    it('can create new queries', function (done) {
        QueryFactory.create('ingvar ambjørnsen', function (result) {
            done();
        });
    });
    
    it('can have results', function (done) {
        var searchString = 'det tenkende mennesket';
        QueryFactory.create(searchString, function (queryResult) {
            ResultFactory.create(queryResult.insertId, 1, function () {
                QueryFactory.read(searchString, function (query) {
                    console.log(query);
                    done();
                });
            });
        });
    });

}); 
