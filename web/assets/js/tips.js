(function () { 
    var self    = this;
    var tips    = document.querySelectorAll('.tips > .tip');
    var btns    = document.querySelectorAll('.tips > span');
    this.index  = 0;
    var pasties = {
        wiki: 'https://no.wikipedia.org/wiki/Jens_Stoltenberg',
        snl : 'https://snl.no/Norge', 
    } 
    
    Object.keys(pasties).forEach(function (pastie) {
        document.getElementById(pastie).addEventListener('click', function (event) {
            event.stopPropagation();
            document.querySelector('input[name=q]').value = pasties[pastie];
        });
    }); 

    var rotateTips = function (index) {
        var current = index % (tips.length);
        
        tips[current].style.display = 'block';
        btns[current].className = 'active';

        for (i = 0; i < btns.length; i++)
            if (i !== current) {
                btns[i].className = '';
                tips[i].style.display = 'none';
            }
    }

    for (i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (event) {
            var element = event.srcElement;
            var sibling = element.parentNode.children;
            self.index = Array.prototype.indexOf.call(sibling, element) - btns.length;
            rotateTips(self.index);
        });
    }    

    rotateTips(this.index);
    setInterval(function () {
        rotateTips(self.index++);
    }, 7500);
}());
