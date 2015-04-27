var logger = require('../../log/logger.js');

function ExceptionController (error, req, res, next) {
    
    if (error.message.indexOf('PDF') !== -1)
        var errorMessage = {
            title: 'PDF format',
            message: 'Vi støtter dessverre ikke PDF-format enda.'
        }

    if (error.message.indexOf('ingen treff') !== -1)
        var errorMessage = {
            title: 'Ingen treff',
            message: 'Beklager, vi fant ingen treff for ' + 
                req.query.q + '.'
        }
    
    if (errorMessage === undefined) {
        logger.log('error', error.message);
        var errorMessage = {
            title: 'Oooops',
            message: 'En feil har oppstått. Heldigvis er en nerd på saken.'
        }
    }

    res.render('error', errorMessage);
}

module.exports = ExceptionController;
