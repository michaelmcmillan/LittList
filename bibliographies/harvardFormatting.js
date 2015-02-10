HarvardFormatting = {
    
    book: {
        title: function (title) {
            return '<em>' + title + '</em>';
        },
        
        place: function (place) {
            return place + ':';     
        },

        author: function (authors) {
            var authorLine = '';
            authors.forEach(function (author, index) { 
                authorLine += author.getSurname() + ', ' + 
                    author.getInitials(author.getForename())
                    .split('').join('.') + '.';
                
                if (index == authors.length - 2)
                    authorLine += ' og ';
                else if (index <  authors.length - 2)
                    authorLine += ', ';
            });
            return authorLine;
        },

        publicationYear: function (year) {
            return '(' + year + ')';                 
        }
    }
};

module.exports = HarvardFormatting;
