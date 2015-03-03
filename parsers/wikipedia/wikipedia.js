var request   = require('request');
var url       = require('url');
var languages = require('./languages.js');

function Wikipedia () {
    
    var urlFilter = 'wikipedia.org/wiki/';
    var supportedLanguages = ['en', 'no'];
    var userAgent = 'LittList.no';
    var host      = 'wikipedia.org';
    var endpoint  =  '/w/api.php';
    var arguments = '?' + [
        'format=json',
        'action=parse',
        'page=Main%20Page',
    ].join('&');
    
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

    this.parseReferencesFromArticle = function (articleContent) {
    
    }
}

module.exports = Wikipedia;
