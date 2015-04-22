var Book = require('./book.js');

function CSL (list) {
    
    var items = {};
    
    list.getReferences().forEach(function (reference) {
        
        // Converts a Book model to a CSL-JSON
        // compatible data format.
        if (reference instanceof Book) {
            var id = reference.getId(); 

            items[id]                    = {};
            items[id].id                 = reference.getId();
            items[id].type               = 'book'; 
            items[id].title              = reference.getTitle() || '';
            items[id].publisher          = reference.getPublisher() || '';
            items[id]['publisher-place'] = reference.getPublicationPlace() || '';
        }
    
        // Iterates over all authors in the reference
        // and adds them to the CSL-JSON object
        if (reference.getAuthors().length > 0) {
            items[id].author = [];
            reference.getAuthors().forEach(function (author) {
                items[id].author.push({
                    family: author.getSurname()  || '',
                    given:  author.getForename() || ''
                });
            });
        }
    });

    return items; 
}

module.exports = CSL;
