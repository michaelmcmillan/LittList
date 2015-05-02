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
        secret: 'e'
    },

    database: function () {
        if (process.env['TEST'] === undefined)
            return {
                database: 'littlist',
                user:     'root',
                password: '',
                host:     'localhost',
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
                user: 'root',
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
