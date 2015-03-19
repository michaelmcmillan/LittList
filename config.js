module.exports = {
    web: {
        port: 8080     
    },

    database: {
        dialect:  'mysql',
        database: '',
        username: '',
        password: '',
        host:     '',
    },
    
    crawlers: {
        useragent: ''
    },

    logger: {
        pushbullet: {
            apiKey:  '',
            title:   '',
            devices: '',
        }
    }
}
