var request = require('request');
var Website = require('../../models/website.js');
var Author  = require('../../models/author.js');

function Readability (apiKey) {
    
    var apiKey  = apiKey;
    var host    = 'https://readability.com';
    var baseURL = '/api/content/v1/parser';
    
    this.getRequestPath = function (url) {
        return '?url=' + url + '&token=' + apiKey; 
    }
   
    this.isURL = function (url) {
        var allowedPrefixes = ['https://', 'http://', 'www.', '//'];
        var legalURL        = false;

        for (i = 0; i < allowedPrefixes.length; i++)
            if (url.indexOf(allowedPrefixes[i]) === 0)
                legalURL = true;
        
        if (url.indexOf(' ') !== -1)
            legalURL = false;

        return legalURL;
    }

    this.convertToWebsite = function (apiResponse, queryString) {

        if (apiResponse === undefined) 
            throw new Error('Ingen respons fra api\'et.');

        var website = new Website(queryString);
        
        if (apiResponse.title !== undefined
        &&  apiResponse.title != null)
            website.setTitle(apiResponse.title);
        
        if (apiResponse.url !== undefined
        &&  apiResponse.url != null)
            website.setURL(queryString);

        if (apiResponse.author !== undefined 
        &&  apiResponse.author != null) {
            var author = new Author(apiResponse.author);
            website.addAuthor(author);
        }

        if (apiResponse.date_published !== undefined
        &&  apiResponse.date_published != null)
            website.setPublicationDate(new Date(apiResponse.date_published));
        
        return website;
    }

    this.search = function (url, done) {
        var self = this;

        if (apiKey === undefined)
            return done(new Error('Mangler nøkkel til api\'et'));
        
        if (url.substr(-4) === '.pdf')
            return done(new Error('PDF støttes dessverre ikke'));

        if (url.indexOf('www.') === 0)
            url = 'http://' + url;

        var apiURL = host + baseURL + this.getRequestPath(url);
        request(apiURL, function (error, response, data) {
            
            if (response.statusCode === 400)
                return done(new Error('Noe gikk galt, sjekk URL\'en: ' + url));
            
            if (response.statusCode === 403)
                return done(new Error('Klarte ikke å autentisere mot Readability'));

            if (response.statusCode === 404)
                return done(new Error('Nettsiden finnes ikke.'));

            if (response.statusCode === 500)
                return done(new Error('Ekstern feil. Prøv igjen senere.'));
            
            var apiResponse = JSON.parse(data);
            var websiteToReturn = self.convertToWebsite(apiResponse, url);

            done(undefined, websiteToReturn);
        });
    }
}

module.exports = Readability;
