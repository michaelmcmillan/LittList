/* Detect selected text */
document.querySelector('.a4').addEventListener('mouseup', function () {
    var selectedText = getSelectedText();

    if (selectedText !== '' || selectedText.length !== 0 || selectedText != null) {
        _paq.push(['trackEvent', 'list', 'select-copied', selectedText]);
    }
});

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
    return '';
}

/* Zeroclipboard */
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
        _paq.push(['trackEvent', 'list', 'copied']);
        document.location.href = '/liste?feedback';
    });
});
