var cheerio = require('cheerio');

function WikiParser (html) {
    
    var self    = this;
    var html    = html || '';
    var $       = cheerio.load(html);
    this.length = 0;
    var liTags;  

    this.getArticleHTML = function () {
        return html;
    }
    
    this.parseLiTags = function () {
        liTags = $('li[id^="cite_note-"]');
        this.length = liTags.length;
    }
    
    this.getLiTags = function () {
        return liTags;
    }
    
    this.extractURLFromLiTag = function (liTag) {
        var hrefTag = $(liTag).find('a.external');
        return hrefTag.attr('href');
    }


    this.extractAccessedDateFromLiTag = function (liTag) {
        var accessDateTag = $('span.reference-accessdate');
        return accessDateTag.text();
    }

    this.extractTextFromLiTag = function (liTag) {
        var textTag = $('span.reference-text');
        var text = textTag.text().trim();

        var accessDate = this.extractAccessedDateFromLiTag(liTag);
        if (text.indexOf(accessDate) !== -1) {
            text = text.replace(accessDate, '');
        }

        return text;
    }

    this.getCitation = function (index) {
        var currentLiTag = liTags[index];

        if (currentLiTag == undefined)
            throw new Error('Fant ingen li-tags med den indexen');

        return {
            url:  this.extractURLFromLiTag (currentLiTag),
            text: this.extractTextFromLiTag(currentLiTag) 
        }
    }

    this.parseLiTags();
}

module.exports = WikiParser;
