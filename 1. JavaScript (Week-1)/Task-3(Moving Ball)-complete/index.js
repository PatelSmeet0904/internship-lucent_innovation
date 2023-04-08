//get element using their ID
var divElement = document.getElementById("box");
var ball = document.getElementById("ball");
var loop = document.getElementById("loop");

//default value
var stepX = ball.offsetWidth;
var stepY = ball.offsetHeight;
var x = 0,
  y = 0;
var count = 0; // Represents total count of intervals
var timeMs = 0; // for each interval

var forward = false,
  start = false,
  reset = false,
  pause = false;

var id,
  elemHeight,
  elemWidth,
  startTime = 0,
  endTime = 0,
  iter = 0;

// getting from localStorage
if (localStorage.length > 0) {
  x = +localStorage.getItem("width");
  y = +localStorage.getItem("height");
  pause = localStorage.getItem("isPaused") === "true";
  forward = localStorage.getItem("isForward") === "true";
  ball.style.left = x + "px";
  ball.style.bottom = y + "px";
}

// for buttons
var totalSecond = document.getElementById("quantity");

//Below commented code is for input type="text"

//chacking input value
// function checkVal(val) {
//   if (isNaN(parseInt(val))) {
//     var defVal = 5;
//     totalSecond.value = defVal.toString();
//     console.log(totalSecond.value);
//   }
// }

// function increment() {
//   checkVal(totalSecond.value);
//   totalSecond.value = (+totalSecond.value + 1).toString();
//   clear();
//   setTotal();
// }

// function decrement() {
//   checkVal(totalSecond.value);
//   if (+totalSecond.value > 1) {
//     totalSecond.value = (+totalSecond.value - 1).toString();
//     clear();
//     setTotal();
//   }
// }

//checking for digite between 0-9
totalSecond.onkeypress = function (e) {
  var ev = e || window.event;
  if (ev.charCode < 48 || ev.charCode > 57) {
    return false; // not a digit
  } else if (this.value * 10 + ev.charCode - 48 > this.max) {
    return false;
  } else {
    return true;
  }
};

function increment() {
  totalSecond.stepUp();
  clear();
  setTotal();
}

function decrement() {
  if (totalSecond.value > 1) {
    totalSecond.stepDown();
    clear();
    setTotal();
  }
}

// Runs on window size change
changeWH();
setTotal();

window.addEventListener("resize", changeWH);
window.addEventListener("resize", setTotal);

function changeWH() {
  elemWidth = divElement.offsetWidth - ball.offsetHeight - 20;
  elemHeight = divElement.offsetHeight - ball.offsetHeight - 20;
}

//This function will also run when the input second changes
function setTotal() {
  // checkVal(totalSecond.value); ---> if input type is text
  count = Math.ceil(
    (elemWidth / stepX) * (elemHeight / stepY) + elemHeight / stepY
  );
  timeMs = +((+totalSecond.value / count) * 1000).toFixed(4);
  console.log(
    "Total iteration:",
    count,
    ", Total second(s):",
    +totalSecond.value,
    ",Time per iteration(ms):",
    timeMs,
    ", Total time(ms):",
    timeMs * count
  );
}

//To reset every thing back
function clear() {
  x = 0;
  y = 0;
  ball.style.left = x + "px";
  ball.style.bottom = y + "px";
  forward = false;
  pause = false;
  iter = 0;
  startTime = 0;
  endTime = 0;
}

// Main function to move the ball
function moveBall() {
  var startTime = new Date().getTime();
  id = setInterval(() => {
    if (start) {
      iter++;
      if (x >= elemWidth || x == 0) {
        forward = !forward;
      }

      if (forward) {
        moveF();
      } else {
        moveB();
      }

      if ((x == 0 || x >= elemWidth) && y < elemHeight) {
        moveUp();
      }

      if (y >= elemHeight && loop.checked) {
        clear();
      }

      if (y >= elemHeight) {
        clearInterval(id);
        endTime = new Date().getTime();
        console.log("Actually iteration taken:", iter);
        console.log("Actually time taken:", endTime - startTime);
        localStorage.clear();
        clear();
      }
    }
  }, timeMs);
}

//Functions to handle the movement of the ball
function moveF() {
  x = x + stepX;
  ball.style.left = x + "px";
}

function moveB() {
  x = x - stepX;
  ball.style.left = x + "px";
}

function moveUp() {
  y = y + stepY;
  ball.style.bottom = y + "px";
}

//Functions to handle the buttons
function Start() {
  start = true;
  clearInterval(id);
  if (!pause) {
    clear();
  }
  moveBall();
  pause = false;
}

function Pause() {
  pause = true;
  localStorage.setItem("width", x);
  localStorage.setItem("height", y);
  localStorage.setItem("isPaused", pause);
  localStorage.setItem("isForward", forward);
  clearInterval(id);
}

function Reset() {
  start = false;
  pause = false;
  clear();
  clearInterval(id);
  localStorage.clear();
}

// For clock
var timer = document.getElementById("timer");

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  timer.textContent =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
}

setInterval(time, 1000);
