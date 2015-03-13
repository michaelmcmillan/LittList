var bookModel    = require('./schemas/book.js');
var websiteModel = require('./schemas/website.js');

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
