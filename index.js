"use strict";

var asdf = 0;
var lol = 0;

window.onload = function() {
  checkAdapativeAsync();
  console.log(navigator);
  // if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //         .register('./service-worker.js')
  //         .then(function () { console.log('Service Worker Registered'); });
  // }
  (function(d) {
    var ce = function(e, n) {
        var a = document.createEvent("CustomEvent");
        a.initCustomEvent(n, true, true, e.target);
        e.target.dispatchEvent(a);
        a = null;
        return false;
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
          };
        },
        touchmove: function(e) {
          nm = false;
          ep = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
          };
        },
        touchend: function(e) {
          if (nm) {
            ce(e, "fc");
          } else {
            var x = ep.x - sp.x,
              xr = Math.abs(x),
              y = ep.y - sp.y,
              yr = Math.abs(y);
            if (Math.max(xr, yr) > 20) {
              ce(e, xr > yr ? (x < 0 ? "swl" : "swr") : y < 0 ? "swu" : "swd");
            }
          }
          nm = true;
        },
        touchcancel: function(e) {
          nm = false;
        }
      };
    for (var a in touch) {
      d.addEventListener(a, touch[a], false);
    }
  })(document);
  //EXAMPLE OF USE

  document.body.addEventListener("fc", cube_interactions, false); // 0-50ms vs 500ms with normal click
  document.body.addEventListener("swl", cube_interactions, false);
  document.body.addEventListener("swr", cube_interactions, false);
  document.body.addEventListener("swu", cube_interactions, false);
  document.body.addEventListener("swd", cube_interactions, false);
};

async function checkAdapativeAsync() {
  setInterval(function() {
    // do your thing
    console.log(document.body.clientWidth / document.body.clientHeight);
    if (document.body.clientWidth / document.body.clientHeight < 0.5) {
      document.getElementById("main-container").classList.add("tall-screen");
    } else {
      document.getElementById("main-container").classList.remove("tall-screen");
    }
    if (document.body.clientWidth / document.body.clientHeight > 0.7) {
      document.getElementById("main-container").classList.add("wide-screen");
    } else {
      document.getElementById("main-container").classList.remove("wide-screen");
    }
    // counter++;
    // if(counter === 10) {
    //     clearInterval(i);
    // }
  }, 2000);
}

var green_animation_counter = 0,
  red_animation_counter = 0;
var cube_counter = [0, 0, 0, 0, 0, 0, 0, 0, 0]; //friendly, enemy, tower
var cube_interactions = function(e) {
  var cl = event.target.classList;
  var temp = 0,
    tempA;
  // console.log(e.target.previousSibling, e.target.previousSibling.innerHTML)
  if (e.type == "swl") {
    asdf++;
    console.log(asdf);
  }
  if (asdf == 10) {
    asdf = 0;
    document.getElementById("enemy").id = "temp";
    document.getElementById("friendly").id = "enemy";
    document.getElementById("temp").id = "friendly";
    cube_counter = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    trigger_yellow_animation(document.getElementById("main-container"));
  }
  if (e.type == "swr") {
    lol++;
    console.log(lol);
  }
  if (lol == 10) {
    lol = 0;
    document.getElementsByClassName("red-side")[0].classList.add("temp2");
    document.getElementsByClassName("blue-side")[0].classList.add("temp");

    document.getElementsByClassName("temp")[0].classList.remove("blue-side");
    document.getElementsByClassName("temp")[0].classList.add("red-side");
    document.getElementsByClassName("temp2")[0].classList.remove("red-side");
    document.getElementsByClassName("temp2")[0].classList.add("blue-side");

    document.getElementsByClassName("temp")[0].classList.remove("temp");
    document.getElementsByClassName("temp2")[0].classList.remove("temp2");

    trigger_green_animation(document.getElementById("main-container"));
  }
  if (cl.contains("image") && cl.contains("cube")) {
    if (cl.contains("orange")) {
      tempA = temp = 0;
    } else if (cl.contains("green")) {
      tempA = temp = 1;
    } else if (cl.contains("purple")) {
      tempA = temp = 2;
    }
    if (e.target.parentNode.parentNode.id == "enemy") temp += 3;
    if (e.target.parentNode.parentNode.id == "tower") temp += 6;

    if (e.type == "fc") {
      if (
        cube_counter[tempA] +
          cube_counter[tempA + 3] +
          cube_counter[tempA + 6] <
        22
      ) {
        e.target.parentNode.children[0].innerHTML = ++cube_counter[temp];
        trigger_green_animation(e.target);
        update_score();
      } else {
        trigger_yellow_animation(e.target);
      }
    } else if (e.type == "swd") {
      if (cube_counter[temp] > 0) {
        e.target.parentNode.children[0].innerHTML = --cube_counter[temp];
        trigger_red_animation(e.target);
        update_score();
      } else {
        trigger_yellow_animation(e.target);
      }
    }
  }
};

var trigger_green_animation = function(e) {
  var cl = e.classList;
  cl.remove("red-animation");
  cl.remove("yellow-animation");

  if (cl.contains("green-animation")) {
    cl.remove("green-animation");
    setTimeout(function() {
      cl.add("green-animation");
    }, 5);
  } else {
    cl.add("green-animation");
  }
};

var trigger_red_animation = function(e) {
  var cl = e.classList;
  cl.remove("green-animation");
  cl.remove("yellow-animation");

  if (cl.contains("red-animation")) {
    cl.remove("red-animation");
    setTimeout(function() {
      cl.add("red-animation");
    }, 10);
  } else {
    cl.add("red-animation");
  }
};

var trigger_yellow_animation = function(e) {
  var cl = e.classList;
  cl.remove("green-animation");
  cl.remove("red-animation");

  if (cl.contains("yellow-animation")) {
    cl.remove("yellow-animation");
    setTimeout(function() {
      cl.add("yellow-animation");
    }, 7);
  } else {
    cl.add("yellow-animation");
  }
};

var evaluate_lead = function(input) {
  var friendly_score, enemy_score;
  friendly_score =
    input[0] * (input[6] + 1) +
    input[1] * (input[7] + 1) +
    input[2] * (input[8] + 1);
  enemy_score =
    input[3] * (input[6] + 1) +
    input[4] * (input[7] + 1) +
    input[5] * (input[8] + 1);
  return friendly_score - enemy_score;
};

var friendly_score = 0,
  enemy_score = 0,
  leading_score = 0,
  last_leading_score = 0,
  last_friendly_score = 0,
  last_enemy_score = 0;
var update_score = function() {
  var possible_leads = [0, 0, 0, 0, 0, 0, 0],
    tempA = -1000,
    tempB;
  var friendly_score_display = document.getElementsByClassName(
    "score-display"
  )[0].children[0];
  var leading_score_display = document.getElementsByClassName(
    "score-display"
  )[0].children[1];
  var enemy_score_display = document.getElementsByClassName("score-display")[0]
    .children[2];
  var suggestion_cube = document.getElementById("suggestion-cube");
  friendly_score =
    cube_counter[0] * (cube_counter[6] + 1) +
    cube_counter[1] * (cube_counter[7] + 1) +
    cube_counter[2] * (cube_counter[8] + 1);
  enemy_score =
    cube_counter[3] * (cube_counter[6] + 1) +
    cube_counter[4] * (cube_counter[7] + 1) +
    cube_counter[5] * (cube_counter[8] + 1);
  leading_score = evaluate_lead(cube_counter);
  friendly_score_display.innerHTML = friendly_score;
  enemy_score_display.innerHTML = enemy_score;
  leading_score_display.innerHTML = leading_score;
  tempB = leading_score;

  possible_leads[0] = leading_score;
  possible_leads[1] = possible_leads[2] = possible_leads[3] = possible_leads[4] = possible_leads[5] = possible_leads[6] = -1000;
  if (cube_counter[0] + cube_counter[0 + 3] + cube_counter[0 + 6] < 22)
    possible_leads[1] = evaluate_lead(
      cube_counter
        .slice(0, 6)
        .concat([cube_counter[6] + 1])
        .concat(cube_counter.slice(7, 9))
    );
  if (cube_counter[1] + cube_counter[1 + 3] + cube_counter[1 + 6] < 22)
    possible_leads[2] = evaluate_lead(
      cube_counter
        .slice(0, 7)
        .concat([cube_counter[7] + 1])
        .concat(cube_counter.slice(8, 9))
    );
  if (cube_counter[2] + cube_counter[2 + 3] + cube_counter[2 + 6] < 22)
    possible_leads[3] = evaluate_lead(
      cube_counter.slice(0, 8).concat([cube_counter[8] + 1])
    );
  if (cube_counter[6] >= 1)
    possible_leads[4] = evaluate_lead(
      cube_counter
        .slice(0, 6)
        .concat([cube_counter[6] - 1])
        .concat(cube_counter.slice(7, 9))
    );
  if (cube_counter[7] >= 1)
    possible_leads[5] = evaluate_lead(
      cube_counter
        .slice(0, 7)
        .concat([cube_counter[7] - 1])
        .concat(cube_counter.slice(8, 9))
    );
  if (cube_counter[8] >= 1)
    possible_leads[6] = evaluate_lead(
      cube_counter.slice(0, 8).concat([cube_counter[8] - 1])
    );
  for (var i = 0; i <= 6; i++) {
    if (tempA < possible_leads[i]) {
      tempA = possible_leads[i];
      tempB = i;
    }
  }

  document.getElementById("suggestion").innerHTML = tempA;
  document.getElementById("suggestion-change").innerHTML =
    tempA - leading_score;
  console.log(tempB);
  switch (tempB) {
    case 0:
      suggestion_cube.src = "img/error_cube.png";
      break;
    case 1:
    case 4:
      suggestion_cube.src = "img/orange_cube.png";
      break;
    case 2:
    case 5:
      suggestion_cube.src = "img/green_cube.png";
      break;
    case 3:
    case 6:
      suggestion_cube.src = "img/purple_cube.png";
      break;
  }
  switch (tempB) {
    case 0:
      suggestion_cube.classList.remove("greenbg");
      suggestion_cube.classList.remove("redbg");
      break;
    case 1:
    case 2:
    case 3:
      suggestion_cube.classList.add("greenbg");
      suggestion_cube.classList.remove("redbg");
      break;
    case 4:
    case 5:
    case 6:
      suggestion_cube.classList.remove("greenbg");
      suggestion_cube.classList.add("redbg");
      break;
  }
  /*if(friendly_score>last_friendly_score){
        trigger_green_animation(friendly_score_display)
    }else if(friendly_score<last_friendly_score){
        trigger_red_animation(friendly_score_display)
    }
    if(enemy_score>last_enemy_score){
        trigger_green_animation(enemy_score_display)
    }else if(enemy_score<last_enemy_score){
        trigger_red_animation(enemy_score_display)
    }*/
  if (leading_score > last_leading_score) {
    trigger_green_animation(leading_score_display);
  } else if (leading_score < last_leading_score) {
    trigger_red_animation(leading_score_display);
  }

  last_leading_score = leading_score;
  last_friendly_score = friendly_score;
  last_enemy_score = enemy_score;
  // console.log(friendly_score, enemy_score)
};
