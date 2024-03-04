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
  updateScoreLabels();
  playBtn.textContent = "PLAY";
}

function addToPattern() {
  computerColor.push(Math.floor(Math.random() * 4));
}

function checkUserColors() {
  for (let i = 0; i < userColors.length; i++) {
      if (userColors[i] !== computerColor[i]) {
          gameOver();
          return;
      }
  }
  if (userColors.length === computerColor.length) {
      if (level === 11) {
          gameWin();
          return;
      }
      level++;
      addToPattern();
      userColors = [];
      updateScoreLabels();
      highlightPattern();
  }
}

function highlightColorTile(color) {
  const tile = document.querySelector(`[data-tile="${color}"]`);
  tile.classList.remove("inactive");
  playSound(color);
  setTimeout(() => {
    tile.classList.add("inactive");
  }, 500);
}

function highlightPattern() {
  disableUserClicks();
  let i = 0;
  const interval = setInterval(() => {
    if (i >= computerColor.length) {
      clearInterval(interval);
      enableUserClicks();
      return;
    }
    highlightColorTile(colors[computerColor[i]]);
    i++;
  }, 1000);
}

function handleTileClick(event) {
  if (board.classList.contains("unclickable")) return;
  const color = event.target.dataset.tile;
  userColors.push(colors.indexOf(color));
  highlightColorTile(color);
  checkUserColors();
}

function disableUserClicks() {
  board.classList.add("unclickable");
}

function enableUserClicks() {
  board.classList.remove("unclickable");
}

function updateScoreLabels() {
  levelLabel.textContent = level;
  if (level > highScore) {
    highScore = level;
    highScoreLabel.textContent = highScore;
  }
}

function gameOver() {
  playSound("game-over");
  disableUserClicks();
  alert("Game Over!");
  resetGame();
}

function gameWin() {
  playSound("game-win");
  alert("You Won!");
  resetGame();
}

playBtn.addEventListener("click", () => {
  resetGame();
  addToPattern();
  highlightPattern();
});

document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", handleTileClick);
});