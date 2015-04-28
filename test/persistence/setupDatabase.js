var fs          = require('fs');
var assert      = require('assert');
var mysql       = require('mysql');
var config      = require('../../config.js');

describe('setupDatabase', function () {

   var database = mysql.createConnection({
        host     : config.database().host,
        user     : config.database().user,
        password : config.database().password,
        multipleStatements: true
    }); 

    it('should connect to the database', function (done) {
        database.connect();
        database.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            if (err) throw err;
            assert.equal(rows[0].solution, 2);
            done();
        });
    });

    it('should import the database schema', function (done) {
        fs.readFile(__dirname + '/../../database/schema.sql', function (err, data) {
            if (err) throw err;
            var databaseName = config.database().database;
            var createStatements = 'DROP DATABASE IF EXISTS `'+ databaseName +'`;' + 
                'CREATE DATABASE `'+ databaseName +'` CHARACTER SET utf8 COLLATE utf8_general_ci;' +
                'USE `'+ databaseName +'`;';
            var sql = createStatements + data.toString();

            database.query(sql, function (err, rows, fields) {
                if (err) throw err;
                done();
            });
        }); 
    });
}); 
