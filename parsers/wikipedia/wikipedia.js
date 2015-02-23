var request = require('request');

function Wikipedia () {
   
    var supportedLanguages = ['en', 'no'];
    var userAgent = '//LittList.no';
    var host      = 'wikipedia.org';
    var endpoint  =  '/w/api.php'
    var arguments = '?' + [
        'format=json',
        'action=query',
        'titles=Main%20Page',
        'prop=revisions',
        'rvprop=content'
    ].join('&');
    
    this.search = function (query) {
     
    };
}
