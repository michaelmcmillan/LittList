var controllers = require('../controllers/controllers.js'); 
var router      = require('express').Router();

module.exports = (function () {

    /* Root */
    router.get('/',              controllers.general.index);

    /* List */
    router.get('/liste',         controllers.list.view);
    router.get('/liste/:url',    controllers.list.view);
    router.post('/liste',        controllers.list.create);

    /* User */
    router.get('/registrering',  controllers.user.form.signup);
    router.post('/registrering', controllers.user.signup);
    router.get('/innlogging',    controllers.user.form.login);
    router.post('/innlogging',   controllers.user.login);

    /* Feedback */
    router.post('/feedback',     controllers.feedback.create);

    /* Reviews */
    router.get('/omtaler',       controllers.reviews.view);
    
    /* Posts */
    router.get('/innlegg',       controllers.posts.view);

    return router;
})();
