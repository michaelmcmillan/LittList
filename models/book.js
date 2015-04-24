var ISBNValidator = require('isbn').ISBN;

function Book (newTitle) {
    var id;
    var title; 
    var authors   = [];
    var ISBN;
    var publisher;
    var publicationYear;
    var publicationPlace;
    var edition; 
    this.isInList = false;
    var self = this;
    
    var filterTitle = function (unfilteredTitle) {
        if (unfilteredTitle === null || unfilteredTitle === undefined)
            title = '';
        else 
            title = unfilteredTitle.trim();
    }
    
    filterTitle(newTitle);

    this.getId = function () {
        return id;
    }

    this.setId = function (databaseId) {
        id = databaseId;
        return this;
    }

    this.getTitle = function () {
        return title;
    }
    
    this.getPublisher = function () {
        return publisher;
    }
    
    this.getPublicationPlace = function () {
        return publicationPlace;
    }
    
    this.getPublicationYear = function () {
        return publicationYear;
    }

    this.getEdition = function () {
        return edition;
    }
    
    this.setEdition = function (bookEdition) {
        edition = bookEdition; 
    }
    
    this.setPublisher = function (bookPublisher) {
        publisher = bookPublisher; 
    }
    
    this.setPublicationPlace = function (place) {
        place = place || '';
        publicationPlace = place.replace(/[0-9\-\_\[\]\#\!\*\¨\^\"]+/g, ''); 
    }
    
    this.setPublicationYear = function (year) {
        year = '' + year;
        year = year.replace(/[^0-9]/g, '');
        publicationYear = parseInt(year); 
    }

    this.getISBN = function () {
        return ISBN;
    }

    this.setISBN = function (ISBNno) {
        ISBN = ISBNno;
    }
    
    this.addAuthor = function (author) {
        authors.push(author); 
    }
    
    this.addAuthors = function (authors) {
        authors.forEach(function (author) {
            self.addAuthor(author); 
        });
    }
    
    this.getAuthors = function () {
        return authors; 
    }
    
    this.raw = function () {
        return {
            title: title,
            edition: edition,
            publisher: publisher,
            publicationYear: publicationYear,
            publicationPlace: publicationPlace,
            ISBN: ISBN,
            authors: authors
        };
    }

    this.toString = function () {
        return [
            this.getTitle(),
            this.getEdition(),
            this.getPublisher()
        ].join(', ');
    }
}

module.exports = Book;
