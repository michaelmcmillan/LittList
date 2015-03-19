var port   = require('../../config.js').web.port;
var domain = 'http://localhost:' + port;

casper.test.begin('Searching for a popular book returns more than 1 result', 2, function suite(test) {

    casper.start(domain, function () {
        this.fill('form#query', {
            q: "ingvar ambjørnsen"
        }, true);
    });

    casper.then(function () {
        test.assertUrlMatch(/q=ingvar/, 'reached the results page');
    });
    
    casper.then(function () {
        test.assertExist('.entry');
    });

    casper.run(function() {
        test.done();
    });
});
