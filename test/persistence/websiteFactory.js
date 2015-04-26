var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');
var Website     = require('../../models/website.js');
var Author      = require('../../models/author.js');
var WebsiteFactory = require('../../database/factories/website.js');

describe('websiteFactory', function () {

    it('creates a website entry in the database', function (done) {
        var website = new Website('http://vg.no');
        website.addAuthor(new Author('Mads Andersen'));
        website.setTitle('Verdens Gang');
        WebsiteFactory.create(website, function (err, website) {
            done();
        });
    });

    it('reads the created website back from the database', function (done) {
        WebsiteFactory.read(2, function (err, website) {
            if (err) throw err;
            assert.equal(website.getTitle(), 'Verdens Gang');
            done();
        });
    });
    
    it('reads the authors name from the inserted website', function (done) {
        WebsiteFactory.read(2, function (err, website) {
            assert.equal(website.getAuthors()[0].getForename(), 'Mads');
            done();
        });
    });
}); 
