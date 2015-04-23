function NotFoundController (req, res) {
    res.render('error', {
        title: 'Feil: 404',
        message: 'Vi fant dessverre ikke siden du leter etter.'
    });
}

module.exports = NotFoundController;
