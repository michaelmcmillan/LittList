var assert = require('assert');
var rewire = require('rewire');
var Readability = rewire('../../parsers/readability/readability.js');
var Website = require('../../models/website.js');

describe('Readability', function () {

    it('should inject a given url as a query parameter that is to be used to request the api', function () {
        var readability  = new Readability('secret');
        var originalURL  = 'http://blog.readability.com/2011/02/step-up-be-heard-readability-ideas/';
        var expectedPath = '?url=http://blog.readability.com/2011/02/step-up-be-heard-readability-ideas/&token=secret';
        assert.equal(readability.getRequestPath(originalURL), expectedPath);
    });

    it('should return a website model from the api response', function () {
        var readability = new Readability('secret');
        var apiResponse = {
            content: "<div class=\"article-text\">\n<p>I'm idling outside Diamante's, [snip] ...</p></div>",
            domain: "www.gq.com",
            author: "Rafi Kohan",
            url: "http://www.gq.com/sports/profiles/201202/david-diamante-interview-cigar-lounge-brooklyn-new-jersey-nets?currentPage=all",
            title: "Blowing Smoke with Boxing's Big Voice",
            direction: "ltr",
            word_count: 2892,
            total_pages: 1,
            date_published: null,
            next_page_id: null,
            rendered_pages: 1
        };

        assert.equal(readability.convertToWebsite(apiResponse) instanceof Website, true);
    });

    it('should return the website model with the returned website title', function () {
        var readability = new Readability('secret');
        var apiResponse = {
            title: "Blowing Smoke with Boxing's Big Voice",
        };
        assert.equal(readability.convertToWebsite(apiResponse).getTitle(), 'Blowing Smoke with Boxing\'s Big Voice');
    });

    it('should return the website model with the returned website url', function () {
        var readability = new Readability('secret');
        var apiResponse = {
            url: "http://www.gq.com/sports/profiles/201202/david-diamante-interview-cigar-lounge-brooklyn-new-jersey-nets?currentPage=all",
        };
        assert.equal(readability.convertToWebsite(apiResponse).getURL().indexOf('201202') !== -1, true);
    });

    it('should pass on the published date to the website model as long as its defined', function () {
        var readability = new Readability('secret');
        var apiResponse = {
            date_published: '2011-02-22 00:00:00' 
        }
        assert.equal(readability.convertToWebsite(apiResponse).getPublicationDate().toString(), new Date('2011-02-22 00:00:00').toString());
    });

    it('should construct an author model if there is a single author in the api response', function () {
        var readability = new Readability('secret');
        var apiResponse = {
            author: "Mads Andersen",
        };
        assert.equal(readability.convertToWebsite(apiResponse).getAuthors().length, 1);
    });

    it('should throw exception if the response object is undefined', function () {
        var readability = new Readability('secret');
        var apiResponse = undefined; 
        assert.throws(function () {
            readability.convertToWebsite(apiResponse);
        }, /ingen respons/i);
    });

    it('should throw exception if api key is not provided', function () {
        assert.throws(function () {
           new Readability();
        }, /mangler nøkkel/i);
    });

    it('should return an error in the callback if the api responds with 404', function (done) {
        Readability.__set__('request', function (url, cb) {
            var response = { statusCode: 404 };
            cb(undefined, response);
        });

        var readability = new Readability('secret');
        readability.search('http://vg.no', function (err, website) {
            assert.equal(err.message.indexOf('finnes ikke') !== -1, true);
            done();
        });
    });

    it('should return an error in the callback if the api responds with 500', function (done) {
        Readability.__set__('request', function (url, cb) {
            var response = { statusCode: 500 };
            cb(undefined, response);
        });

        var readability = new Readability('secret');
        readability.search('http://vg.no', function (err, website) {
            assert.equal(err.message.indexOf('Ekstern feil') !== -1, true);
            done();
        });
    });

    it('should return an error in the callback if api respons with 400', function (done) {
        Readability.__set__('request', function (url, cb) {
            var response = { statusCode: 400 };
            cb(undefined, response);
        });

        var readability = new Readability('secret');
        readability.search('http://vg.no', function (err, website) {
            assert.equal(err.message.indexOf('gikk galt') !== -1, true);
            done();
        });
    });

    it('should return an error if the api responds with a invalid token message', function (done) {
        Readability.__set__('request', function (url, cb) {
            var response = { statusCode: 403 };
            var data     = JSON.stringify({
                messages: 'The API Key in the form of the \'token\' parameter is invalid.',
                error: true
            });
            cb(undefined, response, data);
        });

        var readability = new Readability('invalidSecret');
        readability.search('http://vg.no', function (err, website) {
            assert.equal(err.message.indexOf('autentisere') !== -1, true);
            done();
        });
    });
});
