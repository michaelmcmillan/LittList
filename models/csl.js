var Book = require('./book.js');

function CSL (reference) {
    
    var items = {};

    if (reference instanceof Book) {
        var id = reference.getId(); 

        items[id]                    = {};
        items[id].type               = 'book'; 
        items[id].title              = reference.getTitle();
        items[id].id                 = reference.getId();        
        items[id].publisher          = reference.getPublisher();
        items[id]['publisher-place'] = reference.getPublicationPlace();
    }

    if (reference.getAuthors().length > 0) {
        items[id].author = [];
        reference.getAuthors().forEach(function (author) {
            items[id].author.push({
                family: author.getSurname(),
                given:  author.getForename()
            });
        });
    }

    return items; 
}

module.exports = CSL;
