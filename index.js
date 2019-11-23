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
            trigger_add_animation(e.target)
        } else if (e.type == "swd") {
            if (cube_counter[temp] > 0) {
                e.target.parentNode.children[0].innerHTML = --cube_counter[temp]
                trigger_remove_animation(e.target)
            }
        }
        update_score()
    }
};


var trigger_add_animation = function (e) {
    var cl = e.classList
    if (cl.contains("remove-animation")) {
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
}


var trigger_remove_animation = function (e) {
    var cl = e.classList
    if (cl.contains("add-animation")) {
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

var friendly_score = 0, enemy_score = 0, leading_score = 0, last_leading_score = 0, last_friendly_score = 0, last_enemy_score = 0;
var update_score = function () {
    var tempA, tempB, tempC = -1, tempD = -1;
    var friendly_score_display = document.getElementsByClassName("score-display")[0].children[0];
    var leading_score_display = document.getElementsByClassName("score-display")[0].children[1];
    var enemy_score_display = document.getElementsByClassName("score-display")[0].children[2];
    friendly_score = cube_counter[0] * (cube_counter[6] + 1) + cube_counter[1] * (cube_counter[7] + 1) + cube_counter[2] * (cube_counter[8] + 1)
    enemy_score = cube_counter[3] * (cube_counter[6] + 1) + cube_counter[4] * (cube_counter[7] + 1) + cube_counter[5] * (cube_counter[8] + 1)
    leading_score = friendly_score - enemy_score;
    friendly_score_display.innerHTML = friendly_score
    enemy_score_display.innerHTML = enemy_score
    leading_score_display.innerHTML = leading_score
    tempB = leading_score;

    for (var i = 6; i <= 8; i++) {
        if (cube_counter[i] > 0) {
            tempA = cube_counter[i - 6] * (cube_counter[i] - 1) - cube_counter[i - 3] * (cube_counter[i] - 1)
            tempC = i - 6;
        } else {
            tempA = leading_score
            tempC = -1;
        }
        if (cube_counter[i - 6] * (cube_counter[i] + 1) - cube_counter[i - 3] * (cube_counter[i] + 1) > tempA) {
            tempA = cube_counter[i - 6] * (cube_counter[i] + 1) - cube_counter[i - 3] * (cube_counter[i] + 1);
            tempC = i - 3;
        }
        if (tempA > tempB) {
            tempD = tempC
        }
    }
    switch (tempD) {
        case -1:
            
            break;
    }
    /*if(friendly_score>last_friendly_score){
        trigger_add_animation(friendly_score_display)
    }else if(friendly_score<last_friendly_score){
        trigger_remove_animation(friendly_score_display)
    }
    if(enemy_score>last_enemy_score){
        trigger_add_animation(enemy_score_display)
    }else if(enemy_score<last_enemy_score){
        trigger_remove_animation(enemy_score_display)
    }*/
    if (leading_score > last_leading_score) {
        trigger_add_animation(leading_score_display)
    } else if (leading_score < last_leading_score) {
        trigger_remove_animation(leading_score_display)
    }

    last_leading_score = leading_score
    last_friendly_score = friendly_score
    last_enemy_score = enemy_score
    console.log(friendly_score, enemy_score)
};