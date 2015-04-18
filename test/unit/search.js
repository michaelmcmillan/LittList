var assert = require('assert');
var rewire = require("rewire");
var IndexController = rewire('../../controllers/index.js');

describe('Search', function () {
    var reqMock = { query: {}}
    var resMock = {}

    it('should render index if the search parameter (q) is not present', function () {
        resMock.render = function (view) {
            assert.equal(view, 'index');
        }
        IndexController(reqMock, resMock);
    });

    it('should pass on req to FunnelController if the search parameter (q) is present', function () {
        reqMock.query.q = 'ingvar ambjørnsen';
        IndexController.__set__('FunnelController', function (req, res) {
            assert.equal(req, reqMock);
        });
        IndexController(reqMock, resMock);
    });
});
