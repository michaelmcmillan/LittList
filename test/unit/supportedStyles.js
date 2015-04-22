var assert = require('assert');
var rewire = require('rewire');
var supportedStyles = rewire('../../bibliographies/supportedStyles.js');

describe('supportedStyles', function () {
    
    it('should throw exception if the provided directory does not exist', function (done) {
        var bogusStylesDir  = __dirname + '/stylesDirThatDoesNotExist';
        supportedStyles({}, bogusStylesDir, function (err, styles, locales) {
            assert.notEqual(err, undefined);
            done();
        }); 
    });

    it('should return styles that are passed in as allowed', function (done) {
        var bogusStylesDir  = 'stylesdir';
        var allowedStyles   = {
            'harvard1.csl': 'Harvard'
        }

        supportedStyles.__set__('fs', {
            readdir: function (dirLocation, done) {
                if (dirLocation === bogusStylesDir)
                    return done(undefined, Object.keys(allowedStyles));  
            }
        });        

        supportedStyles(allowedStyles, bogusStylesDir, function (err, styles, locales) {
            assert.equal(styles[0], 'Harvard');
            done();
        }); 
    }); 

    it('should not return styles that are not passed in as allowed', function (done) {
        var bogusStylesDir  = 'stylesdir';
        var allowedStyles   = {
            'harvard2.csl': 'Harvard'
        }

        supportedStyles.__set__('fs', {
            readdir: function (dirLocation, done) {
                if (dirLocation === bogusStylesDir)
                    return done(undefined, ['harvard1.csl']);  
            }
        });        

        supportedStyles(allowedStyles, bogusStylesDir, function (err, styles, locales) {
            assert.equal(styles.length, 0);
            done();
        }); 
    }); 
});
