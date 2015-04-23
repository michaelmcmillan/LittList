module.exports = {
    query: {
        funnel: require('./query/funnel.js')
    },

    general: {
        index:  require('./general/index.js'),
        about:  require('./general/about.js')
    },

    list:  {
        view:   require('./list/view.js'),
        create: require('./list/create.js')
    },

    error: {
        notFound:  require('./error/notFound.js'),
        exception: require('./error/exception.js')
    }
};

