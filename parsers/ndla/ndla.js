var config      = require('../../config.js');
var URLParser   = require('url');
var querystring = require('querystring');
var request     = require('request');
var cheerio     = require('cheerio');
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

        return node;
    }

    this.appendPubdateParameter = function (url) {
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
        
        // And finally append it to the base url
        url = parsedURL.path + '?' + parametersInQuerystringFormat;

        return url;
    }
}

module.exports = NDLA;
