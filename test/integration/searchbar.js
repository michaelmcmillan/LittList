var casper = require('casper').create();
var port   = require('../../config.js').web.port;

casper.start('http://localhost:' + port, function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();
