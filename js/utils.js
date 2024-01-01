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
            ${cell.inesAroundCount === 0 && !cell.isMine ? `onclick="expandShown(this, event, ${i}, ${j})"` : `onclick="onCellClicked(this, event, ${i}, ${j})"`}>`
          
                      
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
        console.log('value ', value)
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    if(value === 0){
        value = ''
    }
    elCell.innerText = value
}

// `<td class="${className}" 
//                         oncontextmenu="onCellMarked(this,event,${i},${j})"`

//                         if(cell.inesAroundCount === 0 && !cell.isMine ){
//                            strHTML += `onclick="expandShown(this,event,${i},${j})">`

//                         }else if(cell.inesAroundCount > 0  || cell.isMine === true){
//                             strHTML += `onclick="onCellClicked(this,event,${i},${j})">`
//                         }

