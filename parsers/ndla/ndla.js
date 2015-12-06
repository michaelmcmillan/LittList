var config      = require('../../config.js');
var URLParser   = require('url');
var querystring = require('querystring');
var request     = require('request');
var cheerio     = require('cheerio');
var moment      = require('moment');
var Website     = require('../../models/website.js');
var Author      = require('../../models/author.js');

function NDLA () {

    var self = this;
    var options = {
        'User-Agent': config.crawlers.useragent, 
        followAllRedirects: true,
        maxRedirects: 2,
        encoding: null
    } 
    
    this.isNDLAURL = function (url) {

        // URL must start with http(s)://ndla.no
        // or without protocol: ndla.no
        if (url.indexOf('http://ndla.no')  !== 0 
        &&  url.indexOf('https://ndla.no') !== 0
        &&  url.indexOf('ndla.no')         !== 0)
            return false;

        // Check that the url links to a "node" at NDLA
        if (url.indexOf('node/') === -1)
            return false;
        
        // We will treat the url as a NDLA resource
        return true;
    }

    this.appendPubdateParameter = function (url) {

        // Prepend http:// if protocol is missing
        if (url.indexOf('http') !== 0)
            url = 'http://' + url;
        
        // Parse the url fragments
        var parsedURL = URLParser.parse(url);
        
        // Get the current querystring
        var querystringInURL = parsedURL.search;
        
        // Trim leading question-mark if it is present
        if (querystringInURL !== null && querystringInURL.charAt(0) === '?')
            querystringInURL = querystringInURL.substring(1);
        
        // Return url if it already contains the 'fag' parameter
        var parameters = querystring.parse(querystringInURL);
        if (parameters.fag !== undefined)
            return url;

        // The 'fag' parameter is not present: so we inject it
        parameters.fag = 8;
        
        // We proceed by converting the dict of parameters to a querystring
        var parametersInQuerystringFormat = querystring.stringify(parameters);

        // And finally reassemble the url 
        url = parsedURL.protocol + '//' + parsedURL.hostname + parsedURL.path + '?' + parametersInQuerystringFormat;

        return url;
    }

    this.parse = function (nodeHTML) {

        var node = new Website(); 
        var $ = cheerio.load(nodeHTML);  

        // Extracts the title of the node from opengraph
        var ogTitle = $('meta[property="og:title"]');
        var title   = ogTitle.attr('content');
        node.setTitle(title); 
        
        // Extracts the authors from the node
        var owners = $('div.owner > a');
        owners.each(function (index, owner) {
            var owner = $(owner).text();
            node.addAuthor(new Author(owner));
        });

        // Extracts publication date for the node
        var datesDiv = $('div#edit-dates').first();
        var datesText = datesDiv.contents().filter(function () {
            return this.type === 'text';   
        }).text();
        
        // If there are two dates (publication & modification)
        // only parse the publication. Example: 10.05.2010 (21:38)
        if (datesText !== '' && datesText.indexOf(',') !== -1) {
            var dateToParse = datesText.split(',')[0];
        } else {
            var dateToParse = datesText;
        }
        
        // Move on if there are no dates to parse
        if (dateToParse !== '') {
            var publicationDate = moment(dateToParse, 'DD.MM.YYYY (HH:mm)');
            node.setPublicationDate(publicationDate.toDate());
        }
        
        // Finally return the constructed node (or website if you will)
        return node;
    }


    this.search = function (url, done) {
        var urlWithCorrectParameters = this.appendPubdateParameter(url);
        
        options.url = urlWithCorrectParameters;
        request.get(options, function (err, response, data) {
            if (err) return done(err);
            if ([404, 501].indexOf(response.statusCode) !== -1)
                return done(new Error('Siden finnes ikke på NDLA.no'));
            
            var website = self.parse(data);

            // Set the url to be the the provided url
            website.setURL(urlWithCorrectParameters);

            done(undefined, website);
        });
    }
}

module.exports = NDLA;
