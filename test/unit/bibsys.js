var assert = require('assert');
var Bibsys = require('../../parsers/bibsys/bibsys.js');

describe('Bibsys', function () {
    it('converts the bibsys author name to a plain name', function () {
        var bibsys = new Bibsys();
        assert.equal(bibsys.untangleAuthorName('Dybvig, Magnus Døhl'), 'Magnus Døhl Dybvig');
        assert.equal(bibsys.untangleAuthorName('McMillan, Michael-Martin'), 'Michael-Martin McMillan');
    });
});
