module.exports = {
    web: {
        port: 8080     
    },

    database: {
        database: '',
        user:     '',
        password: '',
        host:     '',
        test: {
            database: 'test_littlist',
            user: 'travis',
            password: '',
            host: 'localhost'
        }
    },
    
    crawlers: {
        useragent: 'LittList v1.0'
    },

    logger: {
        pushbullet: {
            apiKey:  '',
            title:   '',
            devices: '',
        }
    }
}
