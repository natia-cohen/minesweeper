'use strict'

function expandShown(elCell, ev, rowIdx, colIdx) {
    //יום שלישי להמשיך מפה

    ev.preventDefault()

    emptyCellCount(rowIdx, colIdx)

    console.log(gGame.shownCount++)


}

function onCellClicked(elCell, ev, rowIdx, colIdx) {
    const currCell = gBoard[rowIdx][colIdx]
    if (elCell) {
        ev.preventDefault()
        if (currCell.isMarked) return

        if (currCell.isMine) {
            revealsAllTheMines()
            return checkGameOver()

        } else if (!currCell.isShown) {


            renderCell({ i: rowIdx, j: colIdx }, currCell.inesAroundCount)
            gBoard[rowIdx][colIdx].isShown = true
            gGame.shownCount++

            console.log('gGame.shownCount', gGame.shownCount)
            if (checkIfAllMinesAreMarked()) {
                if (checkIfAllCellsShown())
                    return victory()

            }
        } else return

    }


}

function onCellMarked(elCell, ev, rowIdx, colIdx) {
    console.log('onCellMarked')

    if (elCell) {
        ev.preventDefault()

        const currCell = gBoard[rowIdx][colIdx]

        if (!currCell.isMarked) {
            if (currCell.isShown) return

            gBoard[rowIdx][colIdx].isMarked = true
            renderCell({ i: rowIdx, j: colIdx }, FLAG)
            gGame.markedCount++

            if (checkIfAllMinesAreMarked()) {

                if (checkIfAllCellsShown())
                    return victory()


            }
        } else {
            gBoard[rowIdx][colIdx].isMarked = false
            renderCell({ i: rowIdx, j: colIdx }, EMPTY)
            gGame.markedCount--
        }

    }

}

function checkIfAllMinesAreMarked() {
    if (gLevel.MINES === gGame.markedCount) {
        return true
    }
}

function checkIfAllCellsShown() {
    if (gLevel.SIZE ** 2 - gLevel.MINES === gGame.shownCount) {
        return true
    }
}

function emptyCellCount(rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].isShown || gBoard[i][j].isMarked) continue

            if (!gBoard[i][j].isShown && gBoard[i][j].inesAroundCount === 0) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.style.backgroundColor = 'lightgray'
                gBoard[i][j].isShown = true
                gGame.shownCount++
                console.log(gBoard[i][j])
            }

        }
    }
}

