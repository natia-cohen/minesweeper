'use strict'

const EMPTY = ''
const FLAG = '🏴'

var gBoard

var gGame = {
  isON: false,
  firstClick: true,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  lifeLeft: 3,
  isLifeON: false,
}

function init() {

  gGame.isON = true
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

  setMinesOnBoard(board)
  // board[1][1].isMine = true
  // board[3][3].isMine = true
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
  
  if(gGame.lifeLeft < 0 ) return


}

function onClickReset(){
  const elCell = document.querySelector(`.resetBtn span`)
  
   
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secsPassed=0 
    gGame.lifeLeft= 3
    elCell.innerText = '😄'
    gLevel.MINES = 2
    gLevel.SIZE = 4
    init() 
  }


function checkGameOver() {
  if( checkIfAllMinesAreMarked() && checkIfAllCellsShown()){
    return true
    
  }
 
  return false
}

function gameOver(){
  const elCell = document.querySelector(`.resetBtn span`)
  elCell.innerText = '😩'
  gGame.isON = false
  console.log('Game-over')
}

function victory(){
  gGame.isON = false
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