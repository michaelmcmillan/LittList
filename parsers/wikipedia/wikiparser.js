var cheerio = require('cheerio');

function WikiParser (html) {
    
    var self   = this;
    var $      = cheerio.load(html);
    var html   = html;
    var liTags;  
    
    this.getArticleHTML = function () {
        return html;
    }

    this.getLiTags = function () {
        liTags = $('li');
        return liTags; 
    }
    
    this.filterCitationTags = function () {
        liTags.not(function (index, liTag) {
           return ($(this).attr('id').indexOf('cite_note') === 0);
        });

        return liTags.length;
    }
    
    this.getLiTags();
}

module.exports = WikiParser;
