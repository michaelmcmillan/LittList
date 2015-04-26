var client = new ZeroClipboard (document.querySelector('button.copy'));

document.querySelector('button.copy').addEventListener('click', function (event) {
    event.preventDefault();
});

client.on('ready', function (readyEvent) {
    
    var extractBibliographyHTML = function () {
        var a4      = document.querySelector('.a4').cloneNode(true);
        var entries = a4.querySelectorAll('.csl-entry');
        var HTML    = '';

        for (i = 0; i < entries.length; i++) {
            var removeButton = entries[i].querySelector('.manage');
            removeButton.parentNode.removeChild(removeButton);
            HTML += entries[i].innerHTML + "<br/><br/>";
        }

        return HTML;
    }

    client.on('copy', function (event) {
        var clipboard = event.clipboardData;
        clipboard.setData('text/html', extractBibliographyHTML());
    });

    client.on('aftercopy', function (event) {
        _paq.push(['trackEvent', 'copied']);
        alert('Litteraturlisten er kopiert til utklippstavlen! Lim den inn i dokumentet ditt.');
    });
});
