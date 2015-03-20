var controllers = require('./controllers.js'); 
var router = require('express').Router();

module.exports = (function () {

    /* Root */
    router.get('/', controllers.general.index);

    /* General */
    router.get('/om', controllers.general.about);
    
    /* List */
    router.get('/liste',     controllers.list.view);
    router.get('/liste/:id', controllers.list.view);
    router.post('/liste',    controllers.list.create);

    return router;
})();
