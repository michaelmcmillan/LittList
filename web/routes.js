var controllers = require('../controllers/controllers.js'); 
var router = require('express').Router();

module.exports = (function () {

    /* Root */
    router.get('/', controllers.general.index);

    /* General */
    router.get('/om', controllers.general.about);
    
    /* ISBN */
    router.get('/isbn/:isbn', controllers.query.isbn);

    /* List */
    router.get('/liste',      controllers.list.view);
    router.get('/liste/:url', controllers.list.view);
    router.post('/liste',     controllers.list.create);

    return router;
})();
