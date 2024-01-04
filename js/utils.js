'use strict'

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function renderBoard(board) {
    var strHTML = '<table><tbody>'

    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j <board[i].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}" 
            oncontextmenu="onCellMarked(this, event, ${i}, ${j}); return false;"
            ${cell.inesAroundCount === 0 && !cell.isMine  ? `onclick="expandShown(this, event, ${i}, ${j})"` : `onclick="onCellClicked(this, event, ${i}, ${j})"`}>`
                   
            strHTML += '</td>\n'
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>'


    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML

    
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    if(value === 0){
        value = ''
    }
    elCell.innerText = value
}

function getEmptyCell(board){
	var emptyCells = []

	for(var i =0  ; i < board.length ; i++){
		
		for(var j =0 ; j < board[i].length ; j++){
			 var currCell = board[i][j]
			 if(!currCell.isMine){
				emptyCells.push({i,j})
			 }
		}

	}
	if(!emptyCells.length)  return 

	var randomIdx = getRandomIntInclusive(0,emptyCells.length -1 )
	 return emptyCells[randomIdx] 

}