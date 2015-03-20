var assert = require('assert');
var Cache  = require('../../models/cache.js');
var Bibsys = require('../../parsers/bibsys/bibsys.js');

describe('Cache', function () {
    xit('should cache bibsys results from a previous query', function () {
        var bibsys = new Bibsys();
        bibsys.search('ingvar ambjørnsen', function (results) {
            console.log(results); 
        });
    });
});
