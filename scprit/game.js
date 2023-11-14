let level = 0;
let buttons = ["green", "red", "yellow", "blue"];
let userClickedButtons = [];
let gameButtons = [];
isGame = false;

document.addEventListener("keypress", () => {
  if (!isGame) {
    nextSequence();
    isGame = true;
  }
});

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.id === "green") {
      animation("green");
      playSound("green");
      userClickedButtons.push("green");
    } else if (btn.id === "red") {
      animation("red");
      playSound("red");
      userClickedButtons.push("red");
    } else if (btn.id === "yellow") {
      animation("yellow");
      playSound("yellow");
      userClickedButtons.push("yellow");
    } else if (btn.id === "blue") {
      animation("blue");
      playSound("blue");
      userClickedButtons.push("blue");
    }
    checkAnswer(userClickedButtons.length - 1);
  });
});

const playSound = (name) => {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

const animation = (color) => {
  const button = document.querySelector(`#${color}`);
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 100);
};

const gameTurn = () => {
  let number = Math.floor(Math.random() * 4);
  if (number === 0) {
    gameButtons.push("green");
  } else if (number === 1) {
    gameButtons.push("red");
  } else if (number === 2) {
    gameButtons.push("yellow");
  } else {
    gameButtons.push("blue");
  }
  console.log(gameButtons);
  for (let i = 0; i < gameButtons.length; i++) {
    setTimeout(() => {
      animation(gameButtons[i]);
      playSound(gameButtons[i]);
    }, (i + 1) * 500);
  }
};

const nextSequence = () => {
  userClickedButtons = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;

  gameTurn();
};

const checkAnswer = (currentLevel) => {
  if (userClickedButtons[currentLevel] === gameButtons[currentLevel]) {
    if (userClickedButtons.length === gameButtons.length) {
      setTimeout(() => {
        nextSequence();
      }, 1_000);
    }
  } else {
    gameOver();
  }
};

const gameOver = () => {
  document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";
  document.body.classList.add("game-over");
  playSound("wrong");

  setTimeout(() => {
    document.body.classList.remove("game-over");
    startOver();
  }, 2_000);
};

const startOver = () => {
  level = 0;
  gameButtons = [];
  isGame = false;
};
