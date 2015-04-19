var assert = require('assert');
var Book   = require('../../models/book.js');
var rewire = require('rewire');
var BibsysController = rewire('../../controllers/query/bibsys.js');

describe('Cache', function () {
    describe('Bibsys', function () {

        it('should query bibsys if there is no cache', function (done) {
            var reqMock = { query: { q: "ingvar ambjørnsen" } };
            var resMock = { render: function () {} };

            BibsysController.__set__('QueryFactory', {
                read: function (queryString, type, done) {
                    return done(undefined, []); 
                }
            });

            BibsysController.__set__('Bibsys', function () {
                this.search = function (queryString, done) {
                    return done(true);                
                }
            });

            BibsysController(reqMock, resMock, function () {
                done();
            }); 
        });

        it('should not query bibsys if there is cache', function (done) {
            var reqMock = { query: { q: "ingvar ambjørnsen" } };
            var resMock = {};
            
            BibsysController.__set__('ResultController', function (result, req, res, next) {
                assert.equal(result.length, 1);  
                done();
            });

            BibsysController.__set__('QueryFactory', {
                read: function (queryString, type, done) {
                    return done(undefined, [new Book('Elling')]); 
                }
            });

            BibsysController(reqMock, resMock, function () {
                done();
            }); 
        });
    });
});
