module.exports = {
    web: {
        port: 8080     
    },
    
    bibliography: {
        styles: {
            allowed: { 

            },
            location: __dirname + '/bibliographies/styles/'
        },
        locales: {
            location: __dirname + '/bibliographies/locales/'
        }
    },

    database: function () {
        if (process.env['TEST'] === undefined)
            return {
                database: '',
                user:     '',
                password: '',
                host:     '',
                multipleStatements: true
            }
        else if (process.env['CI'])
            return {
                database: 'test',
                user:     process.env['MYSQL_USER'],
                password: process.env['MYSQL_PASSWORD'],
                host:     'localhost',
                multipleStatements: true
            }
        else
            return {
                database: 'test_littlist',
                user: 'travis',
                password: '',
                host: 'localhost',
                multipleStatements: true
            }
    },
    
    crawlers: {
        useragent: 'LittList v1.0'
    },

    logger: {
        pushbullet: {
            apiKey:  '',
            title:   'LittList.no',
            devices: '',
        }
    }
}
