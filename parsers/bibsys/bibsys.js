var request   = require('request');
var iconv     = require('iconv-lite');
var risParser = require('../ris/ris.js');
var Book      = require('../../references/book.js');
var Author    = require('../../references/author.js');

function Bibsys () {
    
    var self    = this;
    var host    = 'http://ask.bibsys.no/';
    var action  = 'ask/action/result?';
    var options = {
        followAllRedirects: true,
        maxRedirects: 2,
        encoding: null,
        headers: {
            cookie: '' 
        }
    } 

    this.parseSession = function (cookieResponse) {
        return cookieResponse[0].match(/JSESSIONID\=[A-Z0-9]*\;/);
    }

    this.search = function (query, callback) {
        request.get(host + action + 'kilde=biblio&q=' + query, function (err, res) {
             options.headers.cookie = self.parseSession(res.headers['set-cookie']);
             self.getRis(callback);
        });
    }

    this.getRis = function (callback) {
        // GET parammeters needed to get 10 books 
        var args = [
            'cmd=sendtil',
            'eksportFormat=refmanager',
        ].concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
            return 'valg=' + num;
        })).join('&');
        
        options.url = host + action + args;
        request.post(options, function (err, res) {
            var parsedRis = [];

            // Charset encoding
            res.body = iconv.decode(res.body, 'iso-8859-15');
            var splits = res.body.split(/(^ER\s{2}\-\s\n)/gm);  
           
            // Split each response, risParse it and callback results 
            for (c = 0; c < splits.length - 1; c += 2) {
                var ris = new risParser(splits[c] + splits[c + 1], false);
                parsedRis.push(ris.parse());
            }
            callback(parsedRis);
        });
    }

    this.convertRisToModels = function (parsedRis) {
        var books = [];
        
        // Iterate over each parsed ris reference
        parsedRis.forEach(function (risBook) {

            var book = new Book(risBook.T1);
            
            // If only one author
            if (typeof risBook.A1 === 'string')
                book.addAuthor(new Author(risBook.A1));

            // If multiple authors add them all
            else if (risBook.A1 instanceof Array)
                risBook.A1.forEach(function (author) {
                    book.addAuthor(new Author(author));
                });
            
            // Push the scaffolded model onto the array 
            books.push(book);
        });

        return books;
    }
}

var bibsys = new Bibsys();
bibsys.search('Det tenkende mennesket', function (parsedCollection) {
    var books = bibsys.convertRisToModels(parsedCollection); 
    console.log(books[2].getAuthors()[0].getName());
});

module.exports = Bibsys;
