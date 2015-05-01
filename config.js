module.exports = {
    web: {
        port: 8080     
    },
    
    bibliography: {
        styles: {
            allowed: { 
                'harvard1.csl'                    : 'Harvard',
                'chicago-author-date.csl'         : 'Chicago',
                'vancouver-author-date.csl'       : 'Vancouver',
                'apa.csl'                         : 'APA',
                'american-medical-association.csl': 'AMA'
            },
            location: __dirname + '/bibliographies/styles/'
        },
        locales: {
            location: __dirname + '/bibliographies/locales/'
        }
    },
    session: {
        secret: ''
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
        else if (process.env['CI'] === true)
            return {
                database: 'test',
                user:     process.env['MYSQL_USER'],
                password: process.env['MYSQL_PASSWORD'],
                host:     'localhost',
                multipleStatements: true
            }
        else
            return {
                database: '',
                user: '',
                password: '',
                host: '',
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
