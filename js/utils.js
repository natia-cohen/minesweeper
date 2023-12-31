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

            strHTML += `<td class="${className}" onclick="onCellClicked(this,${i},${j})">`
                      if(cell.isMine){
                        strHTML += `<span class="hidden-text">${MINE}</span>`
                      }
                      if(!cell.isMine){
                        if(cell.inesAroundCount === 0) strHTML += `<span class="hidden-text">${EMPTY}</span>`
                        else {
                            strHTML += `<span class="hidden-text">${cell.inesAroundCount}</span>`
                        }
                        
                      }
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
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    // const elCell = document.querySelector(`[data-i="${location.i}"][data-j="${location.j}"]`)
    elCell.innerHTML = value
}

// oncontextmenu="onCellMarked(event, this,${i},${j})"