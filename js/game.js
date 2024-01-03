'use strict'

const EMPTY = ''
const FLAG = '🏴'

var gBoard

var gGame = {
  isON: false,
  // firstClick: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  lifeLeft: 3,
  isLifeON: false,
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
  board[1][1].isMine = true
  board[3][3].isMine = true
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
 
function onClickLivesLeft(){
  gGame.isLifeON = true
  gGame.lifeLeft--
  const elCell = document.querySelector(`.btn span`)
   
  if(gGame.lifeLeft === 2){
    elCell.innerText = '2'
  }else if(gGame.lifeLeft === 1){
    elCell.innerText = '1'
  }else if(gGame.lifeLeft === 0){
    elCell.innerText = '0'
  }

  gGame.isLifeON = false
  if(gGame.lifeLeft < 0 ) return
console.log('lifeLeft', gGame.lifeLeft)
  
}
function checkGameOver() {
  if( checkIfAllMinesAreMarked() && checkIfAllCellsShown()) return true
 
  return false
}

function victory() {
  console.log('victory')
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