var config      = require('../../config.js');
var URLParser   = require('url');
var querystring = require('querystring');
var request     = require('request');
var cheerio     = require('cheerio');
var moment      = require('moment');
var Website     = require('../../models/website.js');
var Author      = require('../../models/author.js');

function Studieweb () {

    var self = this;
    var options = {
        'User-Agent': config.crawlers.useragent, 
        followAllRedirects: true,
        maxRedirects: 2,
        encoding: null
    } 
    
    this.isStudiewebURL = function (url) {
        return (url.indexOf('studieweb.net') !== -1);
    }

    this.parse = function (nodeHTML) {

        var node = new Website(); 
        var $ = cheerio.load(nodeHTML);  

        // Extracts the title of the node from opengraph and capitalizes it
        var ogTitle = $('meta[property="og:title"]');
        var title   = ogTitle.attr('content');
        
        if (title !== undefined) {
            
            // Capitalize the first char of title
            title = title.charAt(0).toUpperCase() + title.slice(1);

            // Removes the "- Studieweb.net" suffix from the title
            var suffix = ' - Studieweb.net';
            if (title.indexOf(suffix, title.length - suffix.length) !== -1)
                title = title.substring(0, title.length - suffix.length); 
            
            // Finally set the title
            node.setTitle(title); 
        }
        
        // Finally return the constructed node (or website if you will)
        return node;
    }

    this.search = function (url, done) {
        options.url = url;
        request.get(options, function (err, response, data) {
            if (err) return done(err);
            if ([404, 501].indexOf(response.statusCode) !== -1)
                return done(new Error('Siden finnes ikke på Studieweb.net'));
            
            var website = self.parse(data);

            // Set the url to be the the provided url
            website.setURL(url);

            done(undefined, website);
        });
    }
}

module.exports = Studieweb;
