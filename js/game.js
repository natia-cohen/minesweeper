'use strict'

const EMPTY = ''
const FLAG = '🏴'

var gBoard

var gGame = {
  isON: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0
}

function init() {


  gBoard = buildBoard()
  console.table(gBoard)
  renderBoard(gBoard)


}

function buildBoard() {
  const board = []

  for (var i = 0; i < gLevel.SIZE; i++) {
    board.push([])
    for (var j = 0; j < gLevel.SIZE; j++) {
      board[i][j] = createCellObject()

    }

  }

  // setMinesOnBoard(board)
  board[0][3].isMine = true
  board[3][2].isMine = true
  setMinesNegsCount(board)
  return board

}
function createCellObject() {
  return {
    inesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false
  }
}


function checkGameOver() {
  // Implement your game over logic here
  console.log('Game Over')
}
function victory() {
  console.log('victory')
}

