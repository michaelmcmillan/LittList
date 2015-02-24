var Sequelize = require('sequelize');

var BookModel = Sequelize.define('Book', {
    isbn:            { type: Sequelize.STRING },
    title:           { type: Sequelize.STRING },
    author:          { type: Sequelize.STRING },
    publisher:       { type: Sequelize.STRING },
    publicationYear: { type: Sequelize.STRING },
});

BookModel.sync().then(function () {
    return BookModel.create({
        isbn: 'John',
        title: 'Hancock',
        author: 'Hello',
        publisher: 'hehe',
        publicationYear: '1212'
    });
});
