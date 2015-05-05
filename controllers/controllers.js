module.exports = {
    query: {
        funnel:       require('./query/funnel.js')
    },

    general: {
        index:        require('./general/index.js'),
    },

    list:  {
        view:         require('./list/view.js'),
        create:       require('./list/create.js')
    },
    
    posts: {
        view:         require('./posts/view.js')
    },
    
    user: {
        signup:       require('./user/signup.js'),
        login:        require('./user/login.js'),
        logout:       require('./user/logout.js'),
        form: {
            login:    require('./user/loginForm.js'),
            signup:   require('./user/signupForm.js')
        }
    },

    feedback: {
        create:       require('./feedback/create.js')
    },

    reviews: {
        view:         require('./reviews/view.js')
    },

    error: {
        notFound:     require('./error/notFound.js'),
        exception:    require('./error/exception.js')
    }
};

