var bookModel = require('./bookModel.js');

function Factory () {
    
    this.book = {
        get: function (id) {
            return bookModel.find(id);
        }
    };
}

module.exports = new Factory();
