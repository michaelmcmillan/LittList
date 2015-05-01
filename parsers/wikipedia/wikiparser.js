var cheerio = require('cheerio');

function WikiParser (html) {
    
    var self    = this;
    var html    = html || '';
    var $       = cheerio.load(html);
    var liTags;  
    var supTags;  

    this.getArticleHTML = function () {
        return html;
    }
    
    this.parseLiTags = function () {
        liTags = $('li[id^="cite_note-"]');
    }

    this.parseSupTags = function () {
        supTags = $('sup[id^="cite_ref-"]');
    }
    
    this.getLiTags = function () {
        return liTags;
    }
    
    this.getFootnoteTags = function () {
        return supTags;
    }

    this.extractURLFromLiTag = function (liTag) {
        var hrefTag = $(liTag).find('a.external');
        return hrefTag.attr('href');
    }


    this.extractAccessedDateFromLiTag = function (liTag) {
        var accessDateTag = $('span.reference-accessdate');
        return accessDateTag.text();
    }

    this.extractCiteRefIdFromTag = function (tag) {
        var tagName = $(tag).get(0).name; 
        var tagId   = $(tag).attr('id');
        var citeRefNumber;
        
        if (tagName === 'sup')
            citeRefNumber = tagId.replace('cite_ref-', '');
        else if (tagName === 'li')
            citeRefNumber = tagId.replace('cite_note-', '');
        
        return parseInt(citeRefNumber, 10);
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

    this.extractSentenceFromSupTag = function (supTag) {
        return $(supTag).parent().text();
    }

    this.getCitation = function (index) {
        var currentLiTag = liTags[index];

        if (currentLiTag == undefined)
            throw new Error('Fant ingen li-tags med den indexen');

        return {
            id:   this.extractCiteRefIdFromTag(currentLiTag),
            url:  this.extractURLFromLiTag (currentLiTag),
            text: this.extractTextFromLiTag(currentLiTag) 
        }
    }
    
    this.getFootnote = function (index) {
        var currentSupTag = supTags[index]; 

        if (currentSupTag == undefined)
            throw new Error('Fant ingen sup-tag med den indexen');

        return {
            id:       this.extractCiteRefIdFromTag(currentSupTag),
            sentence: this.extractSentenceFromSupTag(currentSupTag)
        }
    }

    this.getFootnoteWithCitation = function (index) {
        var id;
        var citation = this.getCitation(index);
        var footnote = this.getFootnote(index);
        
        // Only return the citatio and the footnote
        // if they have the same identifier
        if (citation.id === footnote.id)
            return {
                id      : citation.id,
                citation: citation,
                footnote: footnote
            }
    }

    this.parseLiTags();
    this.parseSupTags();
}

module.exports = WikiParser;
