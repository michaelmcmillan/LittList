var config    = require('../../config.js');
var request   = require('request');
var iconv     = require('iconv-lite');
var cheerio   = require('cheerio');
var risParser = require('../ris/ris.js');
var Book      = require('../../models/book.js');
var Author    = require('../../models/author.js');

function Bibsys () {
    
    var self    = this;
    var maxHits = 20;
    var host    = 'http://ask.bibsys.no/';
    var action  = 'ask/action/result?';
    var options = {
        'User-Agent': config.crawlers.useragent, 
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
        query = encodeURIComponent(query);

        request.get(host + action + 'kilde=biblio&treffPrSide='+ maxHits +'&q=' + query,
            function (err, res) {
                options.headers.cookie = self.parseSession(res.headers['set-cookie']);
                 
                // Find number of results to avoid flooding index picker
                var $ = cheerio.load(res.body);
                var hits = parseInt($('#antallTreffId').text());
                
                // Restrict RIS download to number of allowed hits
                if (hits === 0 || isNaN(hits))
                    return callback(new Error('Fant ingen treff.'));

                // If we did not get back more hits than the limit only get
                // the number of hits that was returned
                else if (hits < maxHits) 
                    self.getRis(callback, hits);
                
                // If we exceeded or got the exact number of hits as our
                // limit, get all of the ris files
                else
                    self.getRis(callback, maxHits);
        });
    }

    this.getRis = function (callback, hits) {
        
        // Construct the GET parameters for the request
        var hitsArr = [];
        for (i = 0; i < hits; i++) hitsArr.push(i);
        var args = [
            'cmd=sendtil',
            'eksportFormat=refmanager',
        ].concat(hitsArr.map(function (num) {
            return 'valg=' + num;
        })).join('&');
        
        options.url = host + action + args;
        request.post(options, function (err, res) {
            var parsedRis = [];

            // Convert the encoding from ISO-8859 to UTF-8 
            res.body = iconv.decode(res.body, 'iso-8859-15');
           
            // Split each response by the ER-tag
            var splits = res.body.split(/(^ER\s{2}\-\s\n)/gm);  
            for (c = 0; c < splits.length - 1; c += 2) {
                var ris = new risParser(splits[c] + splits[c + 1], false);
                parsedRis.push(ris.parse());
            }
            
            // Pass the parsed ris into models and return it
            callback(undefined, self.convertRisToModels(parsedRis));
        });
    }
    
    this.untangleAuthorName = function (authorName) {
        
        // Switches the order of surname and forename based on comma position
        var commaPosition = authorName.indexOf(', ');
        if (commaPosition !== -1) 
            return authorName.substring(commaPosition + 2) + ' ' +  
                   authorName.substring(0, commaPosition);
        return authorName;
    }

    this.convertRisToModels = function (parsedRis) {
        // Iterate over each parsed ris reference
        var books = [];
        parsedRis.forEach(function (risBook) {

            var book = new Book(risBook.T1);
            
            // Set attributes based on what's available in the
            // ris object
            if (risBook.SN !== undefined)
                book.setISBN(risBook.SN);
            if (risBook.PB !== undefined)
                book.setPublisher(risBook.PB);
            if (risBook.CY !== undefined)
                book.setPublicationPlace(risBook.CY);
            if (risBook.Y1 !== undefined)
                book.setPublicationYear(risBook.Y1);
            if (risBook.VL !== undefined)
                book.setEdition(risBook.VL);
            
            // Only add one author if only one is present 
            if (typeof risBook.A1 === 'string') {
                var authorName = self.untangleAuthorName(risBook.A1);
                book.addAuthor(new Author(authorName));
            }
            
            // Add all authors if multiple authors are present
            else if (risBook.A1 instanceof Array) {
                risBook.A1.forEach(function (author) {
                    var authorName = self.untangleAuthorName(author);
                    book.addAuthor(new Author(authorName));
                });
            }
            
            // Finallt push the book model onto the array 
            books.push(book);
        });
        return books;
    }
}

module.exports = Bibsys;
