var Book    = require('../book.js');
var Website = require('../website.js'); 
var Format  = require('./harvardFormatting.js');

function Harvard (references) {
    
    var references = references;

    this.getBooks = function () {
        return references; 
    }
    
    this.sort = function () {
        references.sort(function (referenceOne, referenceTwo) {
            var firstSurname  = referenceOne.getAuthors()[0].getName().split(' ').reverse()[0];
            var secondSurname = referenceTwo.getAuthors()[0].getName().split(' ').reverse()[0];
            return firstSurname.localeCompare(secondSurname);  
        }); 
    }
    
    this.authorFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.author(references[referenceIndex].getAuthors());
        
        if (references[referenceIndex] instanceof Website) 
            console.log ('Not yet supported.');
    }
    
    this.yearFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.publicationYear(references[referenceIndex].getPublicationYear());
 
        if (references[referenceIndex] instanceof Website) 
            console.log ('Not yet supported.');
    }
    
    this.titleFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.title(references[referenceIndex].getTitle());
 
        if (references[referenceIndex] instanceof Website) 
            console.log ('Not yet supported.');
    }
    
    this.placeFormat = function (referenceIndex) {
        if (references[referenceIndex] instanceof Book) 
            return Format.book.place(references[referenceIndex].getPublicationPlace());
 
        if (references[referenceIndex] instanceof Website) 
            console.log ('Not yet supported.');
    }
}

module.exports = Harvard;
