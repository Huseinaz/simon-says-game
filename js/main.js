const colors = ["red", "green", "blue", "yellow"];
let computerColor = [];
let userColors = [];
let level = 0;
let highScore = 0;

const board = document.querySelector(".board");
const highScoreLabel = document.getElementById("high-score");
const levelLabel = document.getElementById("level");
const playBtn = document.getElementById("play");

function playSound(color) {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
}

function resetGame() {
  computerColor = [];
  userColors = [];
  level = 0;
  playBtn.textContent = "PLAY";
}

function addToPattern() {
  computerColor.push(Math.floor(Math.random() * 4));
}

playBtn.addEventListener("click", () => {
  resetGame();
  addToPattern();
});
