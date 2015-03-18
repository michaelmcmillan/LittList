document.addEventListener('DOMContentLoaded', function () {
    var entries = document.querySelectorAll('.entry');
    var input   = document.createElement('input');
    var form    = document.querySelector('form#list');
    input.type  = 'hidden';
    input.name  = 'book';
    form.appendChild(input);

    for (i = 0; i < entries.length; i++) {
        var add = entries[i].querySelector('.controls > .add');
        add.addEventListener('click', function (event) {
             var entry = event.srcElement.parentNode.parentNode;
             input.value = entry.getAttribute('data-id');
             form.submit();
        });
    }
});
