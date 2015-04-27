var config  = require('../../config.js');
var Author  = require('../../models/author.js');
var Website  = require('../../models/website.js');
var request = require('request');

function SNL () {

    var self = this; 
    var urlFilter  = 'snl.no/';
    var protocol   = 'https://';
    var host       = 'snl.no';
    var reqOptions = {
        json: true,
        headers: {
            'User-Agent': config.crawlers.useragent 
        }
    }; 
    
    this.search = function (url, done) {
        var pageTitle = this.getArticleFromURL(url);
        var apiURL    = protocol + host + '/' + pageTitle + '.json'; 

        reqOptions.url = apiURL; 
        request.get(reqOptions, function (err, response, data) {
            if (err) return done(err);
            if ([404, 501].indexOf(response.statusCode) !== -1)
                return done(new Error('Siden finnes ikke på SNL.no'));
            
            var website = new Website();

            if (data.url != null)
                website.setURL(data.url);

            if (data.title != null)
                website.setTitle(data.title);
    
            if (data.changed_at != null)
                website.setPublicationDate(new Date(data.changed_at));

            if (data.authors != null && data.authors.length > 0)
                data.authors.forEach(function (author) {
                    if (author.full_name != null
                    &&  author.full_name.indexOf('Store norske leksikon') !== 0) {
                        website.addAuthor(new Author(author['full_name']));
                    }
                });

            done(undefined, website);
        });
    }
    
    this.isSNLURL = function (url) {
        return !!(url.indexOf(urlFilter) !== -1)
        && (url.substring(url.indexOf(urlFilter))
        .match(/\//g)||[]).length === 1;
    }

    this.getArticleFromURL = function (url) {
        url = this.stripHashbang(url);
        url = url.substring(url.indexOf(urlFilter) + urlFilter.length);
        url = encodeURIComponent(url);
        return url;
    }

    this.stripHashbang = function (url) {
        if (url.indexOf('#') !== -1)
            return url.substring(0, url.indexOf('#'));
        else
            return url;
    }
}

module.exports = SNL;
