var fs     = require('fs');
var assert = require('assert');
var mysql  = require('mysql');
var config = require(__dirname + '/../../config.js');
var schema = __dirname + '/../../database/schema.sql'; 

describe('MySQL', function () {
    this.timeout(15000);

    var connection = mysql.createConnection({
        host: config.database.test.host,
        user: config.database.test.username,
        password: config.database.test.password,
        multipleStatements: true
    });

    it('connects to the database', function (done) {
        connection.connect();
        connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
            if (err) throw err
            assert(rows[0].solution == 2);
            done();
        });  
    });

    it('creates the test database', function (done) {
        connection.query('DROP DATABASE IF EXISTS ' + config.database.test.database + ';', 

        function (err, results) {
            if (err) throw err;
            connection.query('CREATE DATABASE ' + config.database.test.database + ';',

            function (err, results) {
                if (err) throw err;
                connection.query('USE ' + config.database.test.database + ';',

                function (err, results) {
                    if (err) throw err;
                    done();
                });
            });
        });
    });
    
    it('creates test tables', function (done) {
        var sql = fs.readFileSync(schema).toString();
        connection.query(sql, function (err, results) {
            if (err) throw err;
            done();
        });
    });
}); 
