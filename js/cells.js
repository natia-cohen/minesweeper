'use strict'

function onCellClicked(elCell, ev, rowIdx, colIdx) {
    ev.preventDefault()
    const audio = new Audio('sound/click.mp3')
    const currCell = gBoard[rowIdx][colIdx]

    if (!gGame.isON) retern

    if (gGame.firstClick) {
        audio.play()
        startTimer()
        firstClickOnBoard(rowIdx, colIdx)

        if (!gGame.isHintON) {

            if (gBoard[rowIdx][colIdx].inesAroundCount > 0) {
                onCellShown(rowIdx, colIdx)
            } else if (gBoard[rowIdx][colIdx].inesAroundCount === 0) {
                revealEmptyCells(rowIdx, colIdx)
            }
        } else {
            revealForSecond(rowIdx, colIdx)
        }
        gGame.firstClick = false

    } else {


        //If I clicked and there is a flag
        if (currCell.isMarked) return

        //If I clicked and there is a mine
        if (currCell.isMine) {
          
        
            if(!gGame.isHintON) { 
                if (gGame.livesLeft > 0) {
                    isLivesLeft()
                    gGame.isLivesON = false
                    return
                } else {
                    revealsAllTheMines()
                    gameOver()
                    return
                }
            }else{
                revealForSecond(rowIdx, colIdx)
            }
        }
        //If the cell is not shown
        if (!currCell.isShown) {
            audio.play()

            if (!gGame.isHintON) {
                if (currCell.inesAroundCount > 0) {
                    onCellShown(rowIdx, colIdx)
                } else if (currCell.inesAroundCount === 0) {
                    revealEmptyCells(rowIdx, colIdx)
                }
            } else {
                revealForSecond(rowIdx, colIdx)
            }


            if (checkGameOver()) {
                victory()
                return
            }


        } else return

    }
}



function firstClickOnBoard(firstRow, firstCol) {
    setMinesOnBoard(firstRow, firstCol)
    setMinesNegsCount()

}

function isLivesLeft() {
    const userConfirmation = confirm("MINE!!!😱 you still have life left, will you continue?")

    if (userConfirmation) {
        alert('To continue playing you must press a button LIVES LEFT, you have 5 seconds! GO..GO..GO!')

        setTimeout(function () {
            if (!gGame.isLivesON) {
                revealsAllTheMines()
                return gameOver()
            }
        }, 5000)
    } else {
        revealsAllTheMines()
        return gameOver()
    }
}


function onCellShown(rowIdx, colIdx) {
    const currCell = gBoard[rowIdx][colIdx]
    const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)

    elCell.style.backgroundColor = 'lightgray'
    renderCell({ i: rowIdx, j: colIdx }, currCell.inesAroundCount)
    innerTextGetColor(rowIdx, colIdx)
    currCell.isShown = true
}


function onCellMarked(elCell, ev, rowIdx, colIdx) {
    ev.preventDefault()
    const audio = new Audio('sound/rightClick.mp3')
    const currCell = gBoard[rowIdx][colIdx]

    //If the cell is already marked
    if (!currCell.isMarked) {
        if (currCell.isShown) return

        audio.play()
        currCell.isMarked = true
        renderCell({ i: rowIdx, j: colIdx }, FLAG)
        gGame.markedCount++

        if (checkGameOver()) return victory()

    } else {
        currCell.isMarked = false
        renderCell({ i: rowIdx, j: colIdx }, EMPTY)
        gGame.markedCount--
    }

}



function revealEmptyCells(rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            var currCell = gBoard[i][j]
            if (j < 0 || j >= gBoard[i].length) continue

            if (i === rowIdx && j === colIdx) {
                onCellShown(rowIdx, colIdx)
                continue
            }
            if (currCell.isShown || currCell.isMarked) continue
            if (currCell.isMine) return

            if (!currCell.isShown) {
                revealEmptyCell(i, j)
            }

        }
    }
}


function revealEmptyCell(i, j) {

    const currCell = gBoard[i][j]
    const elCell = document.querySelector(`.cell-${i}-${j}`)
    elCell.style.backgroundColor = 'lightgray'

    if (currCell.inesAroundCount > 0 && !currCell.isShown) {
        renderCell({ i, j }, currCell.inesAroundCount)
        innerTextGetColor(i, j)
        currCell.isShown = true

        return
    } else if (currCell.inesAroundCount === 0 && !currCell.isShown) {
        renderCell({ i, j }, EMPTY)
        currCell.isShown = true
        revealEmptyCells(i, j)
    }


}


function innerTextGetColor(rowIdx, colIdx) {
    const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
    const currCell = gBoard[rowIdx][colIdx]

    if (currCell.inesAroundCount === 1) {
        elCell.style.color = 'blue'
    } else if (currCell.inesAroundCount === 2) {
        elCell.style.color = 'green'
    } else if (currCell.inesAroundCount === 3) {
        elCell.style.color = 'red'
    } else if (currCell.inesAroundCount === 4) {
        elCell.style.color = '#3b0101'
    }

}

function cellCountShown() {
    gGame.shownCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const currCell = gBoard[i][j]
            if (!currCell.isMine) {
                if (currCell.isShown) gGame.shownCount++

            }
        }
    }

}

function redundantFlags(){
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const currCell = gBoard[i][j]
            if (!currCell.isMine && currCell.isMarked) {
                renderCell({i,j}, X_FLAG)

            }
        }
    }
}