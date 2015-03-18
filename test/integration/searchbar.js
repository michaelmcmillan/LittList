var port   = require('../../config.js').web.port;
var domain = 'http://localhost:' + port;

casper.test.begin('Searching for a popular book returns more than 1 result', 1, function suite(test) {
    casper.start(domain, function () {
        test.assertExists('form > input[name="q"]', "found search form");
    });
});


casper.run();
