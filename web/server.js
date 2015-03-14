/* Dependencies */
var express     = require('express');
var handlebars  = require('express-handlebars'); 
var config      = require('../config.js');
var routes      = require('./routes.js'); 
var port        = config.web.port;
var app         = express();

/* Bootstrap */
app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use('/', routes);
app.engine('handlebars', handlebars({
    defaultLayout: __dirname + '/views/layouts/main'
}));

/* Lift-off */
app.listen(port, function () {
    console.log('[*] LittList listening on port', port);
});
