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
            callback(self.convertRisToModels(parsedRis));
        });
    }
    
    this.untangleAuthorName = function (authorName) {
        var commaPosition = authorName.indexOf(', ');
        if (commaPosition !== -1) 
            return authorName.substring(commaPosition + 2) + ' ' +  
                   authorName.substring(0, commaPosition);
        return authorName;
    }

    this.convertRisToModels = function (parsedRis) {
        var books = [];
        
        // Iterate over each parsed ris reference
        parsedRis.forEach(function (risBook) {

            var book = new Book(risBook.T1);
            book.setISBN(risBook.SN);
            
            // If only one author
            if (typeof risBook.A1 === 'string') {
                var authorName = self.untangleAuthorName(risBook.A1);
                book.addAuthor(new Author(authorName));
            }
            
            // If multiple authors add them all
            else if (risBook.A1 instanceof Array) {
                risBook.A1.forEach(function (author) {
                    var authorName = self.untangleAuthorName(author);
                    book.addAuthor(new Author(authorName));
                });
            }
            
            // Push the scaffolded model onto the array 
            books.push(book);
        });

        return books;
    }
}
/*
var bibsys = new Bibsys();
bibsys.search('discrete math', function (books) {
    books.forEach(function (book) {
        console.log(book.toString()); 
    });
});
*/
module.exports = Bibsys;
