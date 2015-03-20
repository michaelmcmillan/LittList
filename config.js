module.exports = {
    web: {
        port: 8080     
    },

    database: {
        database: '',
        username: '',
        password: '',
        host:     '',
        test: {
            database: 'test_littlist',
            username: 'root',
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
