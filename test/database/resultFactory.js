var assert       = require('assert');
var mysql        = require('mysql');
var config       = require('../../config.js');
var ResultFactory = require('../../database/factories/result.js');

describe('resultFactory', function () {
    
    it('can create new result records', function (done) {
        ResultFactory.create(1, 1, function (result) {
            done();
        });
    });
}); 
