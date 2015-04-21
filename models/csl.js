var Book = require('./book.js');

function CSL (reference) {
    
    var items = {};

    if (reference instanceof Book) {
        var id = reference.getId(); 

        items[id] = {};
        items[id].title = reference.getTitle();
        items[id].id    = reference.getId();        
        items[id].type  = 'book'; 
        items[id].publisher = reference.getPublicationPlace();
    }

    return items; 
}

module.exports = CSL;
