var database = require('../bootstrap.js');
var Book     = require('../../models/book.js');
var AuthorFactory = require('./author.js');

var BookFactory = {
    database: database,

    read: function (id, cb) {
        database.query('SELECT * FROM Books ' +
            'JOIN `References` ON Books.reference_id = References.id ' +
            'WHERE Books.reference_id = ?', id,
        function (err, rows, fields) {
            var row = rows[0];
            var book = new Book(row.title);
            book.setISBN(row.ISBN);
            book.setEdition(row.edition);
            book.setPublisher(row.publisher);
            book.setPublicationPlace(row.publication_place);
            AuthorFactory.read(row.reference_id, function (authors) {
                book.addAuthors(authors);
                cb(book);
            });
        });
    },

    create: function (book, cb) {
        database.query('INSERT INTO `References` SET ?', {
            title: book.raw().title 
        }, function (err, result) {
            database.query('INSERT INTO Books SET ?', {
                reference_id: result.insertId,
                publisher: book.raw().publisher,
                publication_year: book.raw().publicationYear,
                publication_place: book.raw().publicationPlace,
                isbn: book.raw().ISBN,
                edition: book.raw().edition
            }, function (err, result) {
                cb(result);
            });
        });
    }
}
module.exports = BookFactory;

/*
BookFactory.read(2, function (book) {
    console.log(book.toString());
});

BookFactory.create(new Book('Snømannen'));
*/
