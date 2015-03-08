var express    = require('express');
var handlebars = require('express-handlebars'); 
var config     = require('../config.js');
var port       = config.web.port;
var app        = express();

var Bibsys     = require('../parsers/bibsys/bibsys.js');

app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    defaultLayout: '../../web/views/layouts/main'
}));

app.get('/', function (req, res) {

    if (req.query.q) {
        console.log(req.query.q);

        var bibsys = new Bibsys();
        bibsys.search(req.query.q, function (results) {
            res.render('results', {
                query: req.query.q,
                results: results
            }); 
        });
    } else {
        res.render('index'); 
    }
});

app.get('/liste/:id', function (req, res) {
    console.log('Liste lastet.');
});

app.listen(port, function () {
    console.log('[*] LittList listening on port', port);
});
