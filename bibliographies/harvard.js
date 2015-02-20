var Book    = require('../references/book.js');
var Website = require('../references/website.js'); 
var Format  = require('./harvardFormatting.js');

function Harvard (references) {
    
    var references = references;

    this.getReferences = function () {
        return references; 
    }
    
    this.sort = function () {
        references.sort(function (referenceOne, referenceTwo) {
            var firstSurname  = referenceOne.getAuthors()[0].getName().split(' ').reverse()[0];
            var secondSurname = referenceTwo.getAuthors()[0].getName().split(' ').reverse()[0];
            if (firstSurname < secondSurname) return -1;
            if (firstSurname > secondSurname) return  1;
            return 0;
        }); 
    }
    
    this.authorFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.author(references[referenceIndex].getAuthors());
        
        if (references[referenceIndex] instanceof Website) 
            return '';
    }
    
    this.yearFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.publicationYear(references[referenceIndex].getPublicationYear());
 
        if (references[referenceIndex] instanceof Website) 
            return '';
    }
    
    this.titleFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.title(references[referenceIndex].getTitle());
 
        if (references[referenceIndex] instanceof Website) 
            return Format.website.title(references[referenceIndex].getTitle());
    }
    
    this.placeFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.place(references[referenceIndex].getPublicationPlace());
 
        if (references[referenceIndex] instanceof Website) 
            return '';
    }
}

module.exports = Harvard;
