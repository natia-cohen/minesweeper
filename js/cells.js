'use strict'

function expandShown(elCell, ev, rowIdx, colIdx) {
    ev.preventDefault()
    revealEmptyCells(rowIdx, colIdx)
}

  
function onCellClicked(elCell, ev, rowIdx, colIdx) {    
    const currCell = gBoard[rowIdx][colIdx]
    

        ev.preventDefault()

        //If I clicked and there is a flag
        if (currCell.isMarked) return

        //If I clicked and there is a mine
        if (currCell.isMine) {
        
                //  if( gGame.lifeLeft > 0){
                //      renderCell({ i: rowIdx, j: colIdx }, MINE)להמשיך מפה מחר ביום חמישי
                //      console.log('check if enter to the function')
            
                revealsAllTheMines()
                return checkGameOver()
            }

           
     

        //If the cell is not shown
        if(!currCell.isShown) {
            onCellShown(rowIdx, colIdx)

            if (checkGameOver()) {
                    return victory()
            }
        } else return


}



function onCellShown(rowIdx, colIdx){
   const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
    elCell.style.backgroundColor = 'lightgray'
    renderCell({ i: rowIdx, j: colIdx }, gBoard[colIdx][rowIdx].inesAroundCount)
    innerTextGetColor(rowIdx,colIdx)
    gBoard[rowIdx][colIdx].isShown = true
    gGame.shownCount++
}


function onCellMarked(elCell, ev, rowIdx, colIdx) {
    if (elCell) {
        ev.preventDefault()

        const currCell = gBoard[rowIdx][colIdx]

        if (!currCell.isMarked) {
            if (currCell.isShown) return

            gBoard[rowIdx][colIdx].isMarked = true
            renderCell({ i: rowIdx, j: colIdx }, FLAG)
            gGame.markedCount++
           
            if (checkGameOver()) {

                return victory()
            }

        } else {
            gBoard[rowIdx][colIdx].isMarked = false
            renderCell({ i: rowIdx, j: colIdx }, EMPTY)
            gGame.markedCount--
        }

    }

}


function revealEmptyCells(rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            var currCell = gBoard[i][j]
            if (j < 0 || j >= gBoard[i].length) continue
            if (currCell.isShown || currCell.isMarked) continue
            if (currCell.isMine) return
            if (!currCell.isShown) {
                revealEmptyCell(i, j)
            }

        }

    }
}

function revealEmptyCell(i, j) {

    const currCell = gBoard[i][j]
    const elCell = document.querySelector(`.cell-${i}-${j}`)

    if (currCell.inesAroundCount > 0 && !currCell.isShown) {
        renderCell({ i, j }, currCell.inesAroundCount)
        innerTextGetColor(i,j)
        elCell.style.backgroundColor = 'lightgray'
        gBoard[i][j].isShown = true
        gGame.shownCount++

        return
    } else if (currCell.inesAroundCount === 0) {
        renderCell({ i, j }, EMPTY)
        elCell.style.backgroundColor = 'lightgray'
        currCell.isShown = true
        gGame.shownCount++

        revealEmptyCells(i, j)
    }
}




function innerTextGetColor(rowIdx,colIdx){
    const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
    const currCell = gBoard[rowIdx][colIdx]

    if(currCell.inesAroundCount === 1){
        elCell.style.color = 'blue'
    }else if(currCell.inesAroundCount === 2){
         elCell.style.color = 'green'
    }else if(currCell.inesAroundCount === 3){
        elCell.style.color = 'red'
    }else if(currCell.inesAroundCount === 4){
        elCell.style.color = 'pink'
    }
  
}







  
