module.exports = {
    query:      require('./controllers/query.js'), 

    general: {
        index:  require('./controllers/general/index.js'),
        about:  require('./controllers/general/about.js')
    },

    list:  {
        view:   require('./controllers/list/view.js'),
        create: require('./controllers/list/create.js')
    }
};

