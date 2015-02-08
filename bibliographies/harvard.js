function Harvard (books) {
    
    var books = books;

    this.sort = function () {
        books.sort(function (bookOne, bookTwo) {
            var firstSurname  = bookOne.getAuthors()[0].getName().split(' ').reverse()[0];
            var secondSurname = bookTwo.getAuthors()[0].getName().split(' ').reverse()[0];
            return firstSurname.localeCompare(secondSurname);  
        }); 
    }

    this.getBooks = function () {
        return books; 
    }
    
    this.authorFormat = function (bookIndex) {
        var authorLine = '';
        
        books[bookIndex].getAuthors().forEach(function (author, index) {
            authorLine += author.getSurname() + ', ' + 
                          author.getInitials(author.getForename())
                          .split('').join('.') + '.';

            if (index == books[bookIndex].getAuthors().length - 2)
                authorLine += ' og ';
            else if (index < books[bookIndex].getAuthors().length - 2)
                authorLine += ', ';
        });
       
        return authorLine.trim();
    }
    
    this.yearFormat = function (bookIndex) {
        return '(' + books[bookIndex].getPublicationYear() + ')';
    }
    
    this.titleFormat = function (bookIndex) {
        return '<em>' + books[bookIndex].getTitle() + '</em>'; 
    }
    
    this.placeFormat = function (bookIndex) {
        return books[bookIndex].getPublicationPlace() + ':';
    }

    this.bookToString = function (index) {
         
    }
}

module.exports = Harvard;
