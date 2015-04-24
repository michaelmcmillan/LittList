var logger = require('../../log/logger.js');

function ExceptionController (error, req, res, next) {
    
    if (error.message.indexOf('ingen treff') !== -1)
        var message = 'Beklager, vi fant ingen treff for ' + 
                req.query.q + '.';

        var errorMessage = {
            title: 'Ingen treff',
            message: message
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
