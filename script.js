let box = document.getElementById("box");
let rod = document.querySelectorAll("#rod1,#rod2");
let ball = document.getElementById("ball");
box.style.width = window.innerWidth + "px";
box.style.height = window.innerHeight + "px";

let start = true;
let boxValue = box.getBoundingClientRect();
let rod1 = rod[0].getBoundingClientRect();
let rod2 = rod[1].getBoundingClientRect();

// rod possition set  center
rod.forEach((element) => {
  element.style.left = 50 + "%";
  element.style.transform = "translateX(-50%)";
});
// ball position
ball.style.top = window.innerHeight - rod1.height - 35.5 + "px";

// score same parameter
let score = 0;
let maxScore;
console.log(maxScore);
let x = 0,
  y = 0,
  z = 0;
let xDirection = 5,
  yDirection = 5;

//set value is local storage
if (localStorage.getItem("max") == "undefined") {
  maxScore = 0;
  console.log(maxScore);
} else {
  maxScore = localStorage.getItem("max");
  console.log(maxScore);
}

// move ball on the screen
function movingBall() {
  // let bl = ball.getBoundingClientRect()
  // console.log(bl)
  // console.log(bl.top, bl.right)
  // console.log(rod1.bottom, rod1.right)

  let interval = setInterval(() => {
    let balls = ball.getBoundingClientRect();
    rod1 = rod[0].getBoundingClientRect();
    rod2 = rod[1].getBoundingClientRect();

    if (
      balls.top <= rod1.bottom &&
      balls.left >= rod1.left &&
      balls.right <= rod1.right
    ) {
      yDirection = -yDirection;
      // console.log(yDirection)
    }

    if (
      balls.bottom >= rod2.top &&
      balls.left >= rod2.left &&
      balls.right <= rod2.right
    ) {
      yDirection = -yDirection;
    }

    if (balls.left <= 0 || balls.right >= box.offsetWidth) {
      xDirection = -xDirection;
    }

    x += xDirection;
    // console.log(x)
    y += yDirection;
    // rotate(${z}deg)
    ball.style.transform = `translate(${x}px, ${y}px)`;
    score++;

    // console.log(score)

    if (balls.top <= rod1.top) {
      score = Math.round(score / 10);
      console.log(maxScore);
      maxScore = Math.max(maxScore, score);
      console.log(maxScore);
      localStorage.setItem("max", maxScore);
      localStorage.setItem("score", score);
      alert("Game Over");
      alert(
        `Rod2 wins with a score of ${localStorage.getItem(
          "score"
        )} and Max score is ${localStorage.getItem("max")}`
      );
      localStorage.setItem("name", "Rod2");
      reset(balls);
      clearInterval(interval);
    }

    if (balls.bottom >= rod2.bottom) {
      score = Math.round(score / 10);
      console.log(maxScore);
      maxScore = Math.max(maxScore, score);
      console.log(maxScore);
      localStorage.setItem("max", maxScore);
      localStorage.setItem("score", score);
      alert("Game Over");
      alert(
        `Rod1 wins with a score of ${localStorage.getItem(
          "score"
        )} and Max score is ${localStorage.getItem("max")}`
      );
      localStorage.setItem("name", "Rod1");
      reset(balls, x, y, z);
      clearInterval(interval);
    }
  }, 30);
}

// reset the game

function reset(bl) {
  score = 0;
  console.log("this game start after reset");
  rod.forEach((element) => {
    element.style.left = 50 + "%";
    element.style.transform = "translateX(-50%)";
  });
  if (bl.top <= 0) {
    ball.style.transform = "translate(0px, 0px)";

    ball.style.transform = `translate(0px, ${-(
      box.offsetHeight -
      2 * rod[0].offsetHeight -
      bl.height -
      2
    )}px)`;
    x = 0;
    y = -(box.offsetHeight - 2 * rod[0].offsetHeight - bl.height - 2);
  } else {
    ball.style.transform = "translate(0px, 0px)";
    x = 0;
    y = 0;
    (xDirection = 5), (yDirection = -5);
  }
  console.log(bl);
  start = true;
}

//move the rods on the screen
function movingRods() {
  let u = 40,
    v = u;
  document.addEventListener("keydown", (e) => {
    // console.log(e)
    // let code = e.code
    if (
      (e.key == "ArrowLeft" && rod[0].offsetLeft >= 190) ||
      (e.key == "a" && rod[0].offsetLeft >= 190)
    ) {
      rod[0].style.left = rod[0].offsetLeft - u + "px";
      rod[1].style.left = rod[0].offsetLeft - v + "px";
    } else if (
      (e.key == "ArrowRight" &&
        rod[0].offsetLeft + rod[0].offsetWidth <= window.innerWidth + 155) ||
      (e.key == "d" &&
        rod[0].offsetLeft + rod[0].offsetWidth <= window.innerWidth + 155)
    ) {
      rod[0].style.left = rod[0].offsetLeft + u + "px";
      rod[1].style.left = rod[0].offsetLeft + v + "px";
    }
  });
}

//start the game
// function show() {
//     alert("If you want to play the game then press enter key after this alert message")
// }
// show()

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && start === true) {
    start = false;
    if (
      localStorage.getItem("name") != undefined &&
      localStorage.getItem("max") != undefined
    ) {
      alert(
        `${localStorage.getItem(
          "name"
        )} has max score is ${localStorage.getItem("max")}`
      );
    } else {
      alert("This is your first time!");
    }
    // alert("This is you fist time!")
    //movement of rod and ball
    movingRods();
    movingBall();
  }
});

// show message
const messageContainer = document.getElementById("message-container");
function showMessage() {
  messageContainer.style.display = "block";
  // messageContainer.style.transition = "all 2.5s ease-in-out;";
  messageContainer.style.transform = "scale(2, 2)";
  setTimeout(function () {
    messageContainer.style.display = "none";
  }, 2500);
}

showMessage();
