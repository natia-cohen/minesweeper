"use strict";
function onCellClicked(elCell, ev, rowIdx, colIdx) {
    ev.preventDefault();
    const audio = new Audio("sound/click.mp3");
    const currCell = gBoard[rowIdx][colIdx];

    if (!gGame.isON) return;

    if (gGame.firstClick) {
        audio.play();
        startTimer();
        firstClickOnBoard(rowIdx, colIdx);

        if (!gGame.isHintON) {
            if (gBoard[rowIdx][colIdx].inesAroundCount > 0) {
                onCellShown(rowIdx, colIdx);
            } else if (gBoard[rowIdx][colIdx].inesAroundCount === 0) {
                revealEmptyCells(rowIdx, colIdx);
            }
        } else {
            revealForSecond(rowIdx, colIdx);
        }
        gGame.firstClick = false;
    } else {
        // If I clicked and there is a flag
        if (currCell.isMarked) return;

        // If I clicked and there is a mine
        if (currCell.isMine) {
            if (!gGame.isHintON) {
                isLivesLeft(); // Reduce lives and update the display
                
                // Check if game is over right after updating lives
                if (gGame.livesLeft === 0) {
                    revealsAllTheMines();
                    gameOver();
                    return;
                }
            } else {
                revealForSecond(rowIdx, colIdx);
            }
            return; // Return after processing a mine
        }

        // If the cell is not shown
        if (!currCell.isShown) {
            audio.play();

            if (!gGame.isHintON) {
                if (currCell.inesAroundCount > 0) {
                    onCellShown(rowIdx, colIdx);
                } else if (currCell.inesAroundCount === 0) {
                    revealEmptyCells(rowIdx, colIdx);
                }
            } else {
                revealForSecond(rowIdx, colIdx);
            }

            // Check if game is over
            if (checkGameOver()) {
                victory();
                return;
            }
        } else return;
    }
}



function isLivesLeft() {
   
    gGame.livesLeft--;


    const elLives = document.querySelector('#lives');
    elLives.innerText = '❤️'.repeat(gGame.livesLeft);


    if (gGame.livesLeft === 0) {
        revealsAllTheMines();
        gameOver();
    } else {

        showTemporaryMessage("You hit a mine! Be careful, you have " + gGame.livesLeft + " lives left!");
    }
}

function showTemporaryMessage(message) {
    const elMessage = document.createElement('div');
    elMessage.classList.add('temporary-message');
    elMessage.innerText = message;

    document.body.appendChild(elMessage);

    setTimeout(() => {
        document.body.removeChild(elMessage);
    }, 3000);
}



function onCellShown(rowIdx, colIdx) {
    const currCell = gBoard[rowIdx][colIdx];
    const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`);

    elCell.style.backgroundColor = "lightgray";
    renderCell({ i: rowIdx, j: colIdx }, currCell.inesAroundCount);
    innerTextGetColor(rowIdx, colIdx);
    currCell.isShown = true;


    if (!currCell.isMine) {
        gGame.shownCount++;
    }

    if (checkGameOver()) {
        victory();
    }
}




function onCellMarked(elCell, ev, rowIdx, colIdx) {
    ev.preventDefault();
    const audio = new Audio("sound/rightClick.mp3");
    const currCell = gBoard[rowIdx][colIdx];

    // אם התא כבר מסומן
    if (!currCell.isMarked) {
        if (currCell.isShown) return;

        audio.play();
        currCell.isMarked = true;
        renderCell({ i: rowIdx, j: colIdx }, FLAG);
        gGame.markedCount++;

        // בדוק אם המשחק נגמר
        if (checkGameOver()) return victory();
    } else {
        currCell.isMarked = false;
        renderCell({ i: rowIdx, j: colIdx }, EMPTY);
        gGame.markedCount--;
    }
}



function revealEmptyCells(rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      var currCell = gBoard[i][j];
      if (j < 0 || j >= gBoard[i].length) continue;

      if (i === rowIdx && j === colIdx) {
        onCellShown(rowIdx, colIdx);
        continue;
      }
      if (currCell.isShown || currCell.isMarked) continue;
      if (currCell.isMine) return;

      if (!currCell.isShown) {
        revealEmptyCell(i, j);
      }
    }
  }
}

function revealEmptyCell(i, j) {
  const currCell = gBoard[i][j];
  const elCell = document.querySelector(`.cell-${i}-${j}`);
  elCell.style.backgroundColor = "lightgray";

  if (currCell.inesAroundCount > 0 && !currCell.isShown) {
    renderCell({ i, j }, currCell.inesAroundCount);
    innerTextGetColor(i, j);
    currCell.isShown = true;

    return;
  } else if (currCell.inesAroundCount === 0 && !currCell.isShown) {
    renderCell({ i, j }, EMPTY);
    currCell.isShown = true;
    revealEmptyCells(i, j);
  }
}

function firstClickOnBoard(firstRow, firstCol) {
    setMinesOnBoard(firstRow, firstCol);
    setMinesNegsCount();
}


function innerTextGetColor(rowIdx, colIdx) {
  const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`);
  const currCell = gBoard[rowIdx][colIdx];

  if (currCell.inesAroundCount === 1) {
    elCell.style.color = "blue";
  } else if (currCell.inesAroundCount === 2) {
    elCell.style.color = "green";
  } else if (currCell.inesAroundCount === 3) {
    elCell.style.color = "red";
  } else if (currCell.inesAroundCount === 4) {
    elCell.style.color = "#3b0101";
  }
}

function cellCountShown() {
  gGame.shownCount = 0;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      const currCell = gBoard[i][j];
      if (!currCell.isMine) {
        if (currCell.isShown) gGame.shownCount++;
      }
    }
  }
}

function redundantFlags() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      const currCell = gBoard[i][j];
      if (!currCell.isMine && currCell.isMarked) {
        renderCell({ i, j }, X_FLAG);
      }
    }
  }
}
