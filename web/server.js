/* Dependencies */
var express     = require('express');
var handlebars  = require('express-handlebars'); 
var config      = require('../config.js');
var port        = config.web.port;
var app         = express();

/* Controllers */
var controllers = {
    index: require('./controllers/index.js'),
    query: require('./controllers/query.js'), 
    list:  require('./controllers/list.js'),
}

/* Bootstrap */
app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    defaultLayout: '../../web/views/layouts/main'
}));

/* Routes */
app.get('/', controllers.index);

app.get('/liste/:id', controllers.list);

/* Lift-off */
app.listen(port, function () {
    console.log('[*] LittList listening on port', port);
});
