'use strict';

window.onload = function() {
    (function(d) {
        var
            ce = function(e, n) {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent(n, true, true, e.target);
                e.target.dispatchEvent(a);
                a = null;
                return false
            },
            nm = true,
            sp = {
                x: 0,
                y: 0
            },
            ep = {
                x: 0,
                y: 0
            },
            touch = {
                touchstart: function(e) {
                    sp = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchmove: function(e) {
                    nm = false;
                    ep = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchend: function(e) {
                    if (nm) {
                        ce(e, 'fc')
                    } else {
                        var x = ep.x - sp.x,
                            xr = Math.abs(x),
                            y = ep.y - sp.y,
                            yr = Math.abs(y);
                        if (Math.max(xr, yr) > 20) {
                            ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd')))
                        }
                    };
                    nm = true
                },
                touchcancel: function(e) {
                    nm = false
                }
            };
        for (var a in touch) {
            d.addEventListener(a, touch[a], false);
        }
    })(document);
    //EXAMPLE OF USE
    
    document.body.addEventListener('fc', h, false); // 0-50ms vs 500ms with normal click
    document.body.addEventListener('swl', h, false);
    document.body.addEventListener('swr', h, false);
    document.body.addEventListener('swu', h, false);
    document.body.addEventListener('swd', h, false);
}

var h = function(e) {
    var cl = event.target.classList
    // console.log(cl)
    if(cl.contains("image")&&cl.contains("cube")){
        if(e.type=="fc")
    }
};