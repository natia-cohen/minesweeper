'use strict'

const EMPTY = ''
const FLAG =  '🏴'

var board



var gGame ={
  isON: false,
  shownCount:0, 
  markedCount:0,
  secsPassed: 0
}

function init() {

  board = buildBoard()
  console.table(board)
  renderBoard(board)
  

}

function buildBoard() {
  const board = []

  for (var i = 0; i < gLevel.SIZE ; i++) {
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
function createCellObject(){
  return {
  inesAroundCount: 0,
  isShown: false,
  isMine: false,
  isMarked: false
}
}

function onCellClicked(elCell,rowIdx,colIdx){

  
  // Remove the 'hidden-text' class to expose the content
  const contentElement = elCell.querySelector('.hidden-text');
  contentElement.classList.remove('hidden-text');
  
  // Implement the rest of your click logic here
  console.log(`Cell clicked at row ${rowIdx}, column ${colIdx}`);
}


