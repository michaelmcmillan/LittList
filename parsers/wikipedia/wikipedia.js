var request   = require('request');
var url       = require('url');
var languages = require('./languages.js');
var cheerio   = require('cheerio');

function Wikipedia () {
    
    var urlFilter = 'wikipedia.org/wiki/';
    var supportedLanguages = ['en', 'no'];
    var userAgent = 'LittList.no';
    var host      = 'wikipedia.org';
    var endpoint  =  '/w/api.php';
    var arguments = '?' + [
        'format=json',
        'action=parse',
        'page='
    ].join('&');
    
    this.urlEncodePage = function (wikiPage) {
        if (wikiPage.indexOf('#') !== -1)
            wikiPage = wikiPage.substring(0, wikiPage.lastIndexOf('#'));
        return encodeURIComponent(wikiPage);
    }

    this.isWikipediaURL = function (url) {
        for (i = 0; i < languages.length; i++)
            if (url.indexOf(languages[i] + '.' + urlFilter) !== -1)
                return true;
        return false;
    }
    
    this.stripHashbang = function (url) {
        if (url.lastIndexOf('#') !== -1)
            return url.substring(0, url.lastIndexOf('#'));
        else
            return url;
    }

    this.getArticleFromURL = function (url) {
        url = url.substring(url.indexOf(urlFilter) + urlFilter.length); 
        return this.stripHashbang(url); 
    }

    this.parseRefTags = function (articleContent) {
        var $ = cheerio.load(articleContent);  
        return $('ref');
    }
}

module.exports = Wikipedia;
