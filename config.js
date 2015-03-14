module.exports = {
    web: {
        port: 8000     
    },

    database: {
        dialect:  'mysql',
        database: '',
        username: '',
        password: '',
        host:     '',
    },

    logger: {
        pushbullet: {
            apiKey:  '',
            title:   '',
            devices: '',
        }
    }
}
