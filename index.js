'use strict';

window.onload = function () {
    (function (d) {
        var
            ce = function (e, n) {
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
                touchstart: function (e) {
                    sp = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchmove: function (e) {
                    nm = false;
                    ep = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchend: function (e) {
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
                touchcancel: function (e) {
                    nm = false
                }
            };
        for (var a in touch) {
            d.addEventListener(a, touch[a], false);
        }
    })(document);
    //EXAMPLE OF USE

    document.body.addEventListener('fc', cube_interactions, false); // 0-50ms vs 500ms with normal click
    document.body.addEventListener('swl', cube_interactions, false);
    document.body.addEventListener('swr', cube_interactions, false);
    document.body.addEventListener('swu', cube_interactions, false);
    document.body.addEventListener('swd', cube_interactions, false);
}

var add_animation_counter = 0, remove_animation_counter = 0
var cube_counter = [0, 0, 0, 0, 0, 0, 0, 0, 0]//friendly, enemy, tower
var cube_interactions = function (e) {
    var cl = event.target.classList
    var temp = 0;
    // console.log(e.target.previousSibling, e.target.previousSibling.innerHTML)
    if (cl.contains("image") && cl.contains("cube")) {
        if (cl.contains("orange")) {
            temp = 0
        }
        else if (cl.contains("green")) {
            temp = 1
        }
        else if (cl.contains("purple")) {
            temp = 2
        }
        if (e.target.parentNode.parentNode.id == 'enemy') temp += 3
        if (e.target.parentNode.parentNode.id == 'tower') temp += 6

        if (e.type == "fc") {
            e.target.parentNode.children[0].innerHTML = ++cube_counter[temp]
            if(cl.contains("remove-animation")){
                cl.remove("remove-animation")
            }
            if (cl.contains("add-animation")) {
                cl.remove("add-animation")
                setTimeout(function () {
                    cl.add("add-animation")
                }, 5);
            } else {
                cl.add("add-animation")
            }
            add_animation_counter++
        } else if (e.type == "swd") {
            if (cube_counter[temp] > 0) {
                e.target.parentNode.children[0].innerHTML = --cube_counter[temp]
                if(cl.contains("add-animation")){
                    cl.remove("add-animation")
                }
                if (cl.contains("remove-animation")) {
                    cl.remove("remove-animation")
                    setTimeout(function () {
                        cl.add("remove-animation")
                    }, 10);
                } else {
                    cl.add("remove-animation")
                }
            }
            remove_animation_counter++
        }
        update_score()
    }
};

var friendly_score = 0, enemy_score = 0 , last_friendly_score = 0, last_enemy_score = 0;
var update_score = function(){
    friendly_score = cube_counter[0]*(cube_counter[6]+1) + cube_counter[1]*(cube_counter[7]+1) + cube_counter[2]*(cube_counter[8]+1)
    enemy_score = cube_counter[3]*(cube_counter[6]+1) + cube_counter[4]*(cube_counter[7]+1) + cube_counter[5]*(cube_counter[8]+1)
    document.getElementsByClassName("score-display")[0].children[0].innerHTML = friendly_score
    document.getElementsByClassName("score-display")[0].children[1].innerHTML = enemy_score
    if(friendly_score)
    console.log(friendly_score, enemy_score)
};