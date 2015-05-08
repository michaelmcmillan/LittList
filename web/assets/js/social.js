var modal = picoModal({
    content: 
        '<h2>Lik LittList på Facebook før du kopierer listen!</h2>' + 
        '<p>Det kan ta noen sekunder etter at du har likt siden.</p>' + 
        '<div class="fb-like" data-href="https://facebook.com/littlist.no" ' +
        'data-layout="box_count" data-action="like" data-show-faces="false" ' +
        'data-share="true"></div>',
    closeButton: true,
    width: '720px'
});

document.addEventListener('DOMContentLoaded', function () {
    var a4         = document.querySelector('div.a4');
    var copyButton = document.querySelector('button.copy');
    
    function socialPay (event) {

        // Ignore checkbox
        var target = event.srcElement || event.target;
        if (target.getAttribute('type') == 'checkbox')
            return;
        
        // Show the modal
        modal.show();
        
        // Render like button
        FB.XFBML.parse(document.querySelector('.pico-content'));
    }
    
    function waitForLike () {
        var like = document.querySelector('.fb-like');
        like.addEventListener('mouseover', function () {
            setTimeout(function () {
                Cookies.set('like', true, {
                    expires: new Date(2018, 0, 1) 
                });
                modal.close(); 
                copyButton.style.visibility = 'initial';
            }, 3000); 
        });
    } 
    
    var hasLiked = Cookies.get('like');
    if (hasLiked === undefined) {
        copyButton.style.visibility = 'hidden';
        a4.addEventListener('mousedown', socialPay);
        modal.afterCreate(waitForLike);
    }
});
