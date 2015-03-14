var controllers = require('./controllers.js'); 

module.exports = (function () {
    var router = require('express').Router();

    router.get('/', controllers.index);
    router.get('/liste/:id', controllers.list);

    return router;
})();
