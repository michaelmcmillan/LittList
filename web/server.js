var express = require('express');
var config  = require('../config.js');
var port    = config.web.port;
var app     = express();

app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html'); 
});

app.get('/search/:query', function (req, res) {
    var query = req.params.query;
    res.json({
        books: [
            {}, {}, {}
        ]
    });
});

app.listen(port, function () {
    console.log('[*] LittList listening on port', port);
});

