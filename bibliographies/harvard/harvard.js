var Book    = require('../../models/book.js');
var Website = require('../../models/website.js'); 
var Format  = require('./harvardFormatting.js');

function Harvard (references) {
    
    var references = references || [];

    this.sort = function () {
        references = references.sort(function (referenceOne, referenceTwo) {
            var firstAuthor   = referenceOne.getAuthors()[0];
            var secondAuthor  = referenceTwo.getAuthors()[0];
            if (firstAuthor === undefined || secondAuthor === undefined)
                return 0;

            var firstSurname  = firstAuthor .getName().split(' ').reverse()[0];
            var secondSurname = secondAuthor.getName().split(' ').reverse()[0];
            if (firstSurname < secondSurname) return -1;
            if (firstSurname > secondSurname) return  1;
            return 0;
        }); 
    }
    
    this.sort();

    this.getReferences = function () {
        return references; 
    }

    this.addReference = function (reference) {
        references.push(reference); 
    }

    this.removeReference = function (referenceToRemove) {
        references.forEach(function (reference, index) {
            if (reference.getId() === referenceToRemove.getId())
                references.splice(index, 1);
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

    this.toString = function () {
        var self = this;
        var formattedList = '';

        references.forEach(function (reference, index) {
            var lineInList = '';

            lineInList += self.titleFormat(index);
            lineInList += self.placeFormat(index);
            lineInList += self.yearFormat(index);
            lineInList += '<br/>';

            formattedList += lineInList;
        });

        return formattedList;
    }
}

module.exports = Harvard;
