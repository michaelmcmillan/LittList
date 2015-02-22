function Book (title) {
    
    var title   = title; 
    var authors = [];
    var publicationYear;
    var publicationPlace;
    var edition; 

    this.getTitle = function () {
        return title;
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
    
    this.setPublicationPlace = function (place) {
        publicationPlace = place; 
    }
    
    this.setPublicationYear = function (year) {
        publicationYear = parseInt(year); 
    }

    this.addAuthor = function (author) {
        authors.push(author); 
    }
    
    this.getAuthors = function () {
        return authors; 
    }
}

module.exports = Book;