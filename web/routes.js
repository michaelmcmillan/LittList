var controllers = require('./controllers.js'); 
var router = require('express').Router();

module.exports = (function () {
    router.get('/', controllers.index);
    router.get('/liste', controllers.list);
    router.post('/liste', controllers.list);
    router.get('/liste/:id', controllers.list);
    router.post('/liste/:id', controllers.list);
    return router;
})();
