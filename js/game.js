'use strict'

const EMPTY = ''
var gBoard
const size = 4

function init() {
  
  gBoard = buildBoard()
  console.table(gBoard)
  renderBoard(gBoard, '.board')

}

function buildBoard() {
 
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = ''
     
    }
  }
  board[2][2] = MINES
  board[1][2] = MINES
  setMinesNegsCount(board)
  return board
  
}

