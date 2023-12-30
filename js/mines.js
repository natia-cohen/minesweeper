const MINES = '&#x1F4A3'

function setMinesNegsCount(board){

    
    for (var i = 0; i < board.length ; i++) {
        for (var j = 0; j < board[i].length; j++) {
          board[i][j] = minesNegsCount(i, j, board)
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
            
            if (board[i][j] === MINES)  minesNegsCount++
        }
    }
    console.log('minesNegsCount', minesNegsCount)
    return  minesNegsCount
    
}