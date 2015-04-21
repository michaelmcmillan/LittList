var Book = require('./book.js');

function CLS (reference) {
    
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

module.exports = CLS;
