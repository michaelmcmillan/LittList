var controllers = {
    index: require('./controllers/index.js'),
    query: require('./controllers/query.js'), 
    list:  require('./controllers/list.js'),
}

module.exports = (function () {
    var router = require('express').Router();

    router.get('/', controllers.index);
    router.get('/liste/:id', controllers.list);

    return router;
})();
