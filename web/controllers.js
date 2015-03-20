module.exports = {
    query: {
        funnel: require('./controllers/query/funnel.js')
    },

    general: {
        index:  require('./controllers/general/index.js'),
        about:  require('./controllers/general/about.js')
    },

    list:  {
        view:   require('./controllers/list/view.js'),
        create: require('./controllers/list/create.js')
    }
};

