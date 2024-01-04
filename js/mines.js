'use strict'
const MINE = '💥'

var gLevel = {
    SIZE: 4,
    MINES: 2
}


function onSetLevel(level){
    const elCell = document.querySelector(`.resetBtn span`)
    elCell.innerText = '😄'
    gLevel.SIZE = level
   
  
    if(level === 4) gLevel.MINES = 2
    else if(level === 8) gLevel.MINES = 14
    else gLevel.MINES = 32
    gBoard=buildBoard()
    console.log('gBoard', gBoard)
    renderBoard(gBoard)
   }

   

function setMinesOnBoard(board) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var cell = getEmptyCell(board)
        board[cell.i][cell.j].isMine = true
        console.log('cell:', cell)
    }
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {

            if (!board[i][j].isMine) {
                board[i][j].inesAroundCount = minesNegsCount(i, j, board)

            }
        }
    }

}

function minesNegsCount(rowIdx, colIdx, board) {
    var minesNegsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            if (board[i][j].isMine){
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
