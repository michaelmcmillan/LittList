var controllers = require('../controllers/controllers.js'); 
var router = require('express').Router();

module.exports = (function () {

    /* Root */
    router.get('/',           controllers.general.index);

    /* List */
    router.get('/liste',      controllers.list.view);
    router.get('/liste/:url', controllers.list.view);
    router.post('/liste',     controllers.list.create);
    
    /* Posts */
    router.get('/innlegg',    controllers.posts.view);

    return router;
})();
