var bookModel    = require('./models/book.js');
var websiteModel = require('./models/website.js');

function Factory () {
    
    this.book = {
        get: function (id) {
            return bookModel.find(id);
        }
    };

    this.website = {
        get: function (id) {
            return websiteModel.find(id);
        }
    };
}

module.exports = new Factory();
