var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/assets'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function (request, response) {
    response.render('index.html'); 
});

app.post('/book', function () {

});

app.post('/website', function () {

});

app.listen(8000);
