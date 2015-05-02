var cheerio = require('cheerio');

function WikiParser (html) {
    
    var self    = this;
    var html    = html || '';
    var $       = cheerio.load(html);

    var liTags   = { length: 0 };
    var supTags  = { length: 0 };
    var pTags;

    var selectors = {
        supTags: 'sup[id^="cite_ref-"]',
        liTags : 'li[id^="cite_note-"]',
        pTags  : 'p'
    }

    this.getArticleHTML = function () {
        return html;
    }
    
    this.parseLiTags = function () {
        var matchedLiTags = $(selectors.liTags);

        matchedLiTags.each(function (index, matchedLiTag) {
            var citeRefId     = self.extractCiteRefIdFromTag(matchedLiTag);
            liTags[citeRefId] = matchedLiTag;
            liTags.length    += 1;
        });
    }

    this.parseSupTags = function () {
        var matchedSupTags = $(selectors.supTags);

        matchedSupTags.each(function (index, matchedSupTag) {
            var citeRefId     = self.extractCiteRefIdFromTag(matchedSupTag);
            supTags[citeRefId] = matchedSupTag;
            supTags.length    += 1;
        });
    }

    this.parsePTags = function () {
        pTags = $(selectors.pTags);
    }
    
    this.getLiTags = function () {
        return liTags;
    }
    
    this.getFootnoteTags = function () {
        return supTags;
    }

    this.getParagraphs = function () {
        return pTags;
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
        
        // Strips out the access date
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
        
        // Only return the citation and the footnote
        // if they have the same identifier
        if (citation.id === footnote.id)
            return {
                id      : citation.id,
                citation: citation,
                footnote: footnote
            }
    }
    
    this.getParagraphsWithFootnotes = function () {
        var pTagsWithFootnotes = pTags.has(selectors.supTags);
        return pTagsWithFootnotes;
    }

    this.getParagraphByText = function (text) {
        // Iterates over all the parsed paragraphs to find the one
        // that contains (indexOf) our search text
        var paragraphWithProvidedText = pTags.filter(function (index, pTag) {
            var innerText = $(pTag).text();
            var innerTextContainsProvidedText = (innerText.indexOf(text) !== -1);
            return innerTextContainsProvidedText;
        });
        
        // Currently we only return the first matched paragraph.
        // Keep in mind that a `text` can be featured in multiple paragraphs 
        return paragraphWithProvidedText.get(0);
    }
    
    this.getFootnotesByText = function (text) {
        var pTag          = this.getParagraphByText(text);
        var supTags       = $(pTag).find(selectors.supTags);
        return supTags;
    }

    this.getCitationByText = function (text) {
        var supTagsForText = this.getFootnotesByText(text);
        
        // If the text only has one footenote we only look
        // for one citation and then return that
        if (supTagsForText.length === 1) {
            var supTagForText =  supTagsForText.get(0);
            var footnoteId    =  this.extractCiteRefIdFromTag(supTagForText);
            var citation      =  this.getCitation(footnoteId);
            return citation;
        
        // But if the text has multiple footnotes (which often is the case)
        // we group them in all the citations in an array
        } else if (supTagsForText.length > 1) {
            var citations = [];
            supTagsForText.each(function (index, supTagForText) {
                var footnoteId = self.extractCiteRefIdFromTag(supTagForText);
                var citation   = self.getCitation(footnoteId);
                citations.push(citation);
            });
            return citations;
        }
    }
    
    // Parse the references, footnotes and paragraphs when instantiated
    this.parseLiTags();
    this.parseSupTags();
    this.parsePTags();
}

module.exports = WikiParser;
