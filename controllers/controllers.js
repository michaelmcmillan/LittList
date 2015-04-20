module.exports = {
    query: {
        isbn :  require('./query/isbn.js'),
        funnel: require('./query/funnel.js')
    },

    general: {
        index:  require('./general/index.js'),
        about:  require('./general/about.js')
    },

    list:  {
        view:   require('./list/view.js'),
        create: require('./list/create.js')
    }
};

