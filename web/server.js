var express    = require('express');
var handlebars = require('express-handlebars'); 
var config     = require('../config.js');
var port       = config.web.port;
var app        = express();

app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    // This is a horrible hack due to shortcomings
    // of express-handlebars dir handling.
    defaultLayout: '../../web/views/layouts/main'
}));

app.get('/', function (req, res) {
    if (req.query.q) {
        res.render('results', {
            query: req.query.q
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

