function ExceptionController (error, req, res, next) {

    if (error.message.indexOf('ingen treff') !== -1)
        var errorMessage = {
            title: 'Ingen treff',
            message: 'Beklager, vi fant ingen treff.'
        }
    
    if (errorMessage === undefined)
        var errorMessage = {
            title: 'Oooops',
            message: 'En feil har oppstått. Heldigvis er en nerd på saken.'
        }

    res.render('error', errorMessage);
}

module.exports = ExceptionController;
