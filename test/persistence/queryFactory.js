var assert       = require('assert');
var mysql        = require('mysql');
var config       = require('../../config.js');
var QueryFactory = require('../../database/factories/query.js');
var ResultFactory = require('../../database/factories/result.js');

describe('queryFactory', function () {

    it('can create new queries', function (done) {
        QueryFactory.create('ingvar ambjørnsen', function (err, query) {
            if (err) throw err;
            done();
        });
    });
    
    xit('can have results in relation to a query', function (done) {
        QueryFactory.create('ingvar ambjørnsen', function (err, query) {
            if (err) throw err;
            done();
        });
    });

    xit('can lookup based on a querystring', function (done) {
        QueryFactory.read('ingvar ambjørnsen', 'book', function (queryResult) {
            done();
        });
    });
}); 
