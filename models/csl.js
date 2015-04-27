var Book = require('./book.js');
var Website = require('./website.js');

function CSL (list) {
    
    var items = {};
    
    list.getReferences().forEach(function (reference) {
        
        // Converts a Book model to a CSL-JSON
        // compatible data format.
        if (reference instanceof Book) {
            var id = reference.getId(); 

            items[id]      = {};
            items[id].id   = reference.getId();
            items[id].type = 'book'; 

            if (reference.getTitle() !== undefined)
                items[id].title = reference.getTitle();

            if (reference.getPublicationYear() != null)
                items[id].issued = {
                    'date-parts': [
                        [reference.getPublicationYear()]
                    ]
                };
            
            if (reference.getPublisher() !== undefined && reference.getPublisher() !== null)
                items[id].publisher = reference.getPublisher();

            if (reference.getPublicationPlace() !== undefined && reference.getPublicationPlace() !== null)
                items[id]['publisher-place'] = reference.getPublicationPlace();
        }
        
        // Converts a Website model to a CSL-JSON
        // compatible data format.
        if (reference instanceof Website) {
            var id = reference.getId(); 

            items[id]      = {};
            items[id].id   = reference.getId();
            items[id].type = 'webpage'; 
            items[id].URL  = reference.getURL(); 

            if (reference.getTitle() !== undefined)
                items[id].title = reference.getTitle();

            if (reference.getPublicationDate() != null)
                items[id].issued = {
                    'date-parts': [
                        [reference.getPublicationDate().getFullYear()]
                    ]
                };

            items[id].accessed = {
                'date-parts': [
                    [new Date().getFullYear()],
                    [new Date().getMonth()+ 1],
                    [new Date().getDate()]
                ]
            }
        }
    
        // Iterates over all authors in the reference
        // and adds them to the CSL-JSON object
        if (reference.getAuthors().length > 0) {
            items[id].author = [];
            reference.getAuthors().forEach(function (author) {
                var authorItem = {};
                
                if (author.getSurname() !== undefined)
                    authorItem.family = author.getSurname();

                if (author.getForename() !== undefined)
                    authorItem.given = author.getForename();
                
                if (Object.keys(authorItem).length !== 0)
                    items[id].author.push(authorItem);
            });
        }
    });

    return items; }

module.exports = CSL;
