var bookSchema    = require('./schemas/book.js');
var websiteSchema = require('./schemas/website.js');

function Factory () {
    
    this.book = {
        get: function (id, cb) {
            return bookSchema.find(id).then(function (book) {
                cb(book.get({plain: true})); 
            });
        },

        save: function (book) {
            bookSchema.create({
                isbn: book.getISBN(),
                title: book.getTitle(),
                author: book.getAuthors(),
                publisher: book.getPublisher()[0],
                publicationYear: book.getPublicationYear() 
            });
        }
    };

    this.website = {
        get: function (id) {
            return websiteSchema.find(id);
        }
    };
}

module.exports = new Factory();
