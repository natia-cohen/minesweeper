'use strict'
const MINE = '💣'

var gLevel={
    SIZE: 4,
    MINES: 2
  }

 function  setMinesOnBoard(board){
    //TO DO:Add some randomicity for mines location
    for(var i=0 ; i < gLevel.MINES ; i++){
        var row =  getRandomIntInclusive(0,gLevel.SIZE)
        var col =  getRandomIntInclusive(0,gLevel.SIZE)
        board[row][col].isMine = true
    }
  }


function setMinesNegsCount(board){

    for (var i = 0; i < board.length ; i++) {
        for (var j = 0; j <  board[i].length; j++) {
            
            if(!board[i][j].isMine) {
            board[i][j].inesAroundCount = minesNegsCount(i, j, board)
        
            }
        }
      }

}

function minesNegsCount(rowIdx, colIdx, board){
    var minesNegsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if(i < 0 || i >= board.length) continue
      
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue
            if (i === rowIdx && j === colIdx) continue
                    
            if (board[i][j].isMine)  minesNegsCount++
        }
    }
   
    return  minesNegsCount 
    
}
function revealsAllTheMines(){ 
    for (var i = 0; i <gBoard.length ; i++) {
        for (var j = 0; j <  gBoard[i].length; j++) {
            const currCell = gBoard[i][j]
            if(currCell.isMine){
             renderCell({ i: i, j: j }, MINE)
        
            }
        }
      }
}
