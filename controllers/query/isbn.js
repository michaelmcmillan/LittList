var BibsysController    = require('./bibsys.js');

/**
 * This controller simply forwards any requests
 * to /isbn/:isbn to the Bibsys controller with
 * a modified req object to fit the signature
 * of a book search.
 */
function ISBNController (req, res, next) {
    req.query.q = req.params.isbn; 
    BibsysController(req, res, next);
}

module.exports = ISBNController;
