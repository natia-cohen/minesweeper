"use strict";

const EMPTY = "";
const FLAG = "🏴";
const X_FLAG = "❌";

var gBoard;

var gGame = {
  isON: false,
  isLivesON: false,
  isHintON: false,
  firstClick: true,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  hintsCount: 3,
  livesLeft: 3,

}

function init() {
  gGame.isON = true;
  gGame.livesLeft = 3;

  const elLives = document.querySelector("#lives");
  elLives.innerText = "❤️".repeat(gGame.livesLeft);

  gBoard = buildBoard();
  renderBoard(gBoard);
}

function onSetLevel(level) {
  const elCell = document.querySelector(`.resetBtn span`);
  elCell.innerText = "😄";
  gLevel.SIZE = level;

  if (level === 4) gLevel.MINES = 2;
  else if (level === 8) gLevel.MINES = 14;
  else gLevel.MINES = 32;

  dataReset();
  init();
}

function buildBoard() {
  const board = [];

  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = createCellObject();
    }
  }

  return board;
}

function createCellObject() {
  return {
    inesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false,
  };
}

function onClickLivesLeft() {
  gGame.isLivesON = true;
  gGame.livesLeft--;
  const elCell = document.querySelector(`.btn span`);
  const audio = new Audio("sound/boost.mp3");
  audio.play();

  if (gGame.livesLeft === 2) {
    elCell.innerText = "2";
  } else if (gGame.livesLeft === 1) {
    elCell.innerText = "1";
  } else if (gGame.livesLeft === 0) {
    elCell.innerText = "0";
  }

  if (gGame.livesLeft < 0) return;
}

function dataReset() {
  clearInterval(gIntervalTimer);
  const elBtn = document.querySelector(".btn span");
  const elTimer = document.querySelector(".seconds");

  if (elTimer) elTimer.innerText = "000";
  if (elBtn) elBtn.innerText = "3";

  gGame.isON = false;
  gGame.firstClick = true;
  gGame.shownCount = 0;
  gGame.markedCount = 0;
  gGame.secsPassed = 0;
  gGame.livesLeft = 3;
  gGame.isLivesON = false;
}

function onClickReset() {
  const elBtn = document.querySelector(`.resetBtn span`);

  elBtn.innerText = "😄";

  dataReset();
  init();
}

function checkGameOver() {
  return checkIfAllMinesAreMarked() && checkIfAllCellsShown();
}

function gameOver() {
  const elBtn = document.querySelector(`.resetBtn span`);
  const audio = new Audio("sound/gameOver.mp3");

  audio.play();
  redundantFlags();
  clearInterval(gIntervalTimer);
  elBtn.innerText = "😩";

  gGame.isON = false;
  console.log("Game-over");
}

function victory() {
  gGame.isON = false;
  clearInterval(gIntervalTimer);

  const audio = new Audio("sound/win.mp3");
  audio.play();

  console.log("victory");
}

function checkIfAllMinesAreMarked() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      const currCell = gBoard[i][j];

      if (currCell.isMine && !currCell.isMarked) {
        return false;
      }
    }
  }
  return true;
}

function checkIfAllCellsShown() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      const currCell = gBoard[i][j];

      if (!currCell.isMine && !currCell.isShown) {
        return false;
      }
    }
  }
  return true;
}
