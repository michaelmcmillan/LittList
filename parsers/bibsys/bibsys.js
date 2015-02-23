var request   = require('request');
var risParser = require('../ris/ris.js');

function Bibsys () {
    
    var self    = this;
    var host    = 'http://ask.bibsys.no/';
    var action  = 'ask/action/result?';
    var options = {
        followAllRedirects: true,
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
             self.getRis();
        });
    }

    this.getRis = function (callback) {
        
        var args = [
            'cmd=sendtil',
            'eksportFormat=refmanager',
        ].concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
            return 'valg=' + num;
        })).join('&');
    
        options.url = host + action + args;

        request.post(options, function (err, res) {
            var splits = res.body.split(/(^ER\s{2}\-\s\n)/gm);  
            console.log(splits.length);

            for (i = 0; i < splits.length - 1; i = i + 2) {
                var ris = new risParser(splits[i] + splits[i + 1]);
                
                console.log(ris.parse());
            }
        });
    }
}

var bibsys = new Bibsys();
bibsys.search('food');

module.exports = Bibsys;
