var QueryFactory        = require('../../../database/factories/query.js'); 
var BibsysController    = require('./bibsys.js');
var Bibsys              = require('../../../parsers/bibsys/bibsys.js');
var WikipediaController = require('./wikipedia.js');
var Wikipedia           = require('../../../parsers/wikipedia/wikipedia.js');
var SNLController       = require('./snl.js');
var SNL                 = require('../../../parsers/snl/snl.js');

function FunnelController (req, res) {

    var wikipedia = new Wikipedia()
    var bibsys    = new Bibsys()
    var snl       = new SNL();

    if (wikipedia.isWikipediaURL(req.query.q))
        WikipediaController(req, res);

    else if (snl.isSNLURL(req.query.q))
        SNLController(req, res);

    else
        BibsysController(req, res);
}

module.exports = FunnelController;
