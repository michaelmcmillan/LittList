var validator = require('url');

function Website (url, title) {

    var id;
    var url     = url;
    var title   = title; 
    var authors = [];
    var publicationDate;
    
    this.isWebsite = function (url) {
         
    }

    this.getHostname = function () {
        var hostname = validator.parse(url).hostname;
        return hostname.charAt(0).toUpperCase() + 
               hostname.slice(1)
               .substring(0, hostname.lastIndexOf('.') - 1);
    }
    
    this.addAuthor = function (author) {
        authors.push(author);
    }

    this.getId = function () {
        return id;
    }

    this.getURL = function () {
        return url;
    }
    
    this.getPublicationDate = function () {
        return publicationDate;
    }

    this.setPublicationDate = function (date) {
        publicationDate = date;
    }

    this.setURL = function (newURL) {
        url = newURL; 
    }

    this.setId = function (newId) {
        id = newId; 
    }

    this.getAuthors = function () {
        return authors;
    }

    this.setTitle = function (websiteTitle) {
        title = websiteTitle; 
    }

    this.getTitle = function () {
        if (title !== undefined)
            return title;
        else
            return this.getHostname();
    }
}

module.exports = Website;
