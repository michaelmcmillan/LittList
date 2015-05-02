var config     = require('../../config.js');
var urlRegexp  = require('url-regexp');
var request    = require('request');
var url        = require('url');
var languages  = require('./languages.js');
var cheerio    = require('cheerio');

function Wikipedia () {

    var self = this; 
    var urlFilter  = 'wikipedia.org/wiki/';
    var reqOptions = {
        headers: {
            'User-Agent': config.crawlers.useragent 
        }
    }; 

    var protocol   = 'https://';
    var host       = 'wikipedia.org';
    var endpoint   =  '/w/index.php';
    var apiArguments = '?' + [
        'action=render',
        'title='
    ].join('&');
    
    this.search = function (url, callback) {
        
        var wikiReferences = {
            websites: [],
            books:    [],
            all:      []
        }
        
        var pageTitle = this.getArticleFromURL(url);
        var lang      = this.getLanguageCodeFromURL(url);
        var apiURL    = protocol + lang + '.' + host + endpoint +
                        apiArguments + pageTitle; 

        reqOptions.url = apiURL; 
        console.log(apiURL);
        request.get(reqOptions, function (err, data) {
            if (err) throw err;
            
            var html = data.body;     

            callback(undefined, 'lol');
        }); 
    }
    
    this.urlEncodePage = function (wikiPage) {
        return encodeURIComponent(wikiPage);
    }

    this.isWikipediaURL = function (url) {
        for (i = 0; i < languages.length; i++)
            if (url.indexOf(languages[i] + '.' + urlFilter) !== -1)
                return true;
        return false;
    }
    
    this.stripPipe = function (url) {
        if (url.indexOf('|') !== -1)
            return url.substring(0, url.indexOf('|'));
        else
            return url;
    }
    
    this.stripHashbang = function (url) {
        if (url.indexOf('#') !== -1)
            return url.substring(0, url.lastIndexOf('#'));
        else
            return url;
    }
   
    this.getLanguageCodeFromURL = function (url) {
        var languageCode = url.substr(url.indexOf(urlFilter) - 3, 2); 
        return languageCode;
    }

    this.getArticleFromURL = function (url) {
        // http://xx.[wikipedia.org/wiki/]{pageTitle}#subtitle
        url = url.substring(url.indexOf(urlFilter) + urlFilter.length); 
        url = this.stripHashbang(url);
        return url; 
    }

    this.parseRefTags = function (articleContent) {
        var $ = cheerio.load(articleContent);  
        return $('ref');
    }
}

module.exports = Wikipedia;
