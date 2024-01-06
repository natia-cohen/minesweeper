'use strict'
const MINE = '💥'

var gLevel = {
    SIZE: 4,
    MINES: 2
}


function setMinesOnBoard(firstRow,firstCol) {
  

    for (var i = 0; i < gLevel.MINES; i++) {
        var cell = getEmptyCell(firstRow,firstCol)
        gBoard[cell.i][cell.j].isMine = true
        
    }

}

function setMinesNegsCount() {
    
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const currCell = gBoard[i][j]
            if (!currCell.isMine) {
              currCell.inesAroundCount = minesNegsCount(i, j)

            }
        }
    }

}

function minesNegsCount(rowIdx, colIdx) {
    var minesNegsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            if (gBoard[i][j].isMine){
                minesNegsCount++
               
            } 
        }
    }
    return minesNegsCount

}


function revealsAllTheMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell.isMine) {
                renderCell({ i: i, j: j }, MINE)

            }
        }
    }
}

