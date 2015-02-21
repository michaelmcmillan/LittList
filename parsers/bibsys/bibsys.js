var request = require('request');

function Bibsys () {
    
    var self   = this;
    var host   = 'http://ask.bibsys.no/';
    var action = 'ask/action/result?';
    var session;
    
    this.parseSession = function (cookieResponse) {
        return cookieResponse[0].match(/JSESSIONID\=[A-Z0-9]*\;/);
    }

    this.search = function (query, callback) {
        request.get(host + action + 'kilde=biblio&q=' + query, function (err, res) {
             session = self.parseSession(res.headers['set-cookie']);
             self.getRis();
        });
    }

    this.getRis = function () {
        
        var args = [
            'cmd=sendtil',
            'eksportFormat=refmanager',
        ].concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function (num) {
            return 'valg=' + num;
        })).join('&');
    
        var options = {
            url: host + action + args,
            followAllRedirects: true,
            headers: {
                cookie: session
            }
        } 
        
        request.post(options, function (err, res) {
            console.log(res.body);
        });
    }
}

var bibsys = new Bibsys();
bibsys.search('sult');

module.exports = Bibsys;
