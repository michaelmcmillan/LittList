(function () { 
    var references = document.querySelectorAll('.csl-entry');

    var findParentEntry = function (element) {
        if (element.getAttribute('data-item-id') !== null)
            return element;

        return findParentEntry(element.parentElement);
    }

    for (i = 0; i < references.length; i++) {
        references[i].addEventListener('click', function (event) {
            var entry = findParentEntry(event.srcElement || event.target);

            if (confirm('Ønsker du å fjerne referansen fra listen?')) {
                var form  = document.createElement('form');
                var field = document.createElement('input'); 
                form.setAttribute('method', 'POST');
                form.setAttribute('action', '/liste');
                field.setAttribute('name', 'remove');
                field.setAttribute('value', entry.getAttribute('data-item-id'));
                form.appendChild(field);
                document.body.appendChild(form);
                form.submit();
            }
        });
    }
}());
