var validator = require('url');

function Website (url, title) {
    var url     = url;
    var title   = title; 
    var authors = [];

    this.getHostname = function () {
        var hostname = validator.parse(url).hostname;
        return hostname.charAt(0).toUpperCase() + 
               hostname.slice(1)
               .substring(0, hostname.lastIndexOf('.') - 1);
    }
    
    this.addAuthor = function (author) {
        authors.push(author);
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
