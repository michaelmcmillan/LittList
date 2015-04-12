var assert        = require('assert');
var mysql         = require('mysql');
var config        = require('../../config.js');
var QueryFactory  = require('../../database/factories/query.js');
var ResultFactory = require('../../database/factories/result.js');

describe('queryFactory', function () {

    xit('can create new queries', function (done) {
        QueryFactory.create('ingvar ambjørnsen', function (err, query) {
            if (err) throw err;
            done();
        });
    });
    
    xit('has results based on a query and a result type', function (done) {
        QueryFactory.read('ingvar ambjørnsen', function (err, results) {
            if (err) throw err;
            console.log(results);
            done();
        });
    });
}); 
