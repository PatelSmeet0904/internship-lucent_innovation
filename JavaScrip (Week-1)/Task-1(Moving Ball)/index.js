var steps = 20;
var x = 0,
  y = 0;

var forward = false;

var divElement = document.getElementById("box");
var ball = document.getElementById("ball");

changeWH();
window.addEventListener("resize", changeWH);

function moveBall() {
  setInterval(() => {
    if (x >= elemWidth || x == 0) {
      forward = !forward;
      // moveUp();
    }

    if (forward) {
      moveF();
    } else {
      moveB();
    }

    if (x <= 0 || x >= elemWidth) {
      moveUp();
    }

    if (y >= elemHeight) {
      clear();
    }
  }, 10);
}
function moveF() {
  x = x + steps;
  ball.style.left = x + "px";
}

function moveB() {
  x = x - steps;
  ball.style.left = x + "px";
}

function moveUp() {
  y = y + steps;
  ball.style.bottom = y + "px";
}

function clear() {
  x = 0;
  y = 0;
  ball.style.left = x + "px";
  ball.style.bottom = y + "px";
  forward = false;
}

function changeWH() {
  elemWidth = divElement.offsetWidth - ball.offsetHeight - 20;
  elemHeight = divElement.offsetHeight - ball.offsetHeight - 20;
}

moveBall();
