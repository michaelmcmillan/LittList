function ExceptionController (error, req, res, next) {
    res.render('error', {
        title: 'Oops',
        message: 'Det har oppstått en feil! En nerd er varslet og er på saken.'
    });
}

module.exports = ExceptionController;
