var config  = require('../../config.js');
var Author  = require('../../models/author.js');
var request = require('request');

function SNL () {

    var self = this; 
    var urlFilter  = 'snl.no/';
    var reqOptions = {
        json: true,
        headers: {
            'User-Agent': config.crawlers.useragent 
        }
    }; 
    var protocol   = 'https://';
    var host       = 'snl.no';
    
    this.search = function (url, callback) {
        var pageTitle = this.getArticleFromURL(url);
        var apiURL    = protocol + host + '/' + pageTitle + '.json'; 

        reqOptions.url = apiURL; 
        request.get(reqOptions, function (err, data) {
            if (err) throw err;

            var meta = {
                title: '',
                pubDate: '',
                authors: []
            };
            
            meta.title = data.body.title;
            meta.pubDate = data.body.changed_at;
            data.body.authors.forEach(function (author) {
                meta.authors.push(new Author(author['full_name']));
            });

            callback(meta);
        });
    }
    
    this.isSNLURL = function (url) {
        return !!(url.indexOf(urlFilter) !== -1)
        && (url.substring(url.indexOf(urlFilter))
        .match(/\//g)||[]).length === 1;
    }

    this.getArticleFromURL = function (url) {
        url = this.stripHashbang(url);
        return url.substring(url.indexOf(urlFilter) + urlFilter.length);
    }

    this.stripHashbang = function (url) {
        if (url.indexOf('#') !== -1)
            return url.substring(0, url.indexOf('#'));
        else
            return url;
    }
}

//var snl = new SNL();
//snl.getAsReference('https://snl.no/Jens_Stoltenberg');

module.exports = SNL;
