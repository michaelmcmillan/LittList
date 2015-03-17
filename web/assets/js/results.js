document.addEventListener('DOMContentLoaded', function () {
    var entries = document.querySelectorAll('.entry');

    for (i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var add   = entry.querySelector('.controls > .add');

        add.addEventListener('click', function () {
            alert('hehe');
        });
    }
});
