var logger              = require('../../log/logger.js');
var QueryFactory        = require('../../database/factories/query.js'); 
var BibsysController    = require('./bibsys.js');
var Bibsys              = require('../../parsers/bibsys/bibsys.js');
var WikipediaController = require('./wikipedia.js');
var Wikipedia           = require('../../parsers/wikipedia/wikipedia.js');
var SNLController       = require('./snl.js');
var SNL                 = require('../../parsers/snl/snl.js');

/*
 * This controller works as a funnel for the 
 * Bibsys, SNL and Wikipedia controllers. All
 * incoming search requests pass through here.
 *
 * In addition to checking what type of query
 * it is, each controller will also see if the
 * query is cached to avoid doing redundant work.
 */
function FunnelController (req, res, next) {
    // Push log to self
    logger.log('notify', req.ip + ': "' + req.query.q +'"');

    // External components we can query
    var wikipedia = new Wikipedia();
    var bibsys    = new Bibsys();
    var snl       = new SNL();
    
    // Determine the type
    if (wikipedia.isWikipediaURL(req.query.q))
        WikipediaController(req, res, next);

    else if (snl.isSNLURL(req.query.q))
        SNLController(req, res, next);
    
    else
        BibsysController(req, res, next);
}

module.exports = FunnelController;
