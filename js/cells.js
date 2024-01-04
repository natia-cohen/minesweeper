'use strict'

function expandShown(elCell, ev, rowIdx, colIdx) {
    ev.preventDefault()
    // if(!gGame.isON) return
    revealEmptyCells(rowIdx, colIdx)
}

  
function onCellClicked(elCell, ev,rowIdx, colIdx) {    
        ev.preventDefault()
        const currCell = gBoard[rowIdx][colIdx]
     

    //    if(!gGame.isON) return

        //If I clicked and there is a flag
        if (currCell.isMarked) return

        //If I clicked and there is a mine
        if (currCell.isMine) {
        
                 if( gGame.lifeLeft > 0){
                    isLifeLeft()          
                 }else{
                    revealsAllTheMines()
                    gameOver()
                     return 

                 }        
            gGame.isLifeON =false         
            return         
         }

        //If the cell is not shown
        if(!currCell.isShown) {
            onCellShown(rowIdx, colIdx)

            if (checkGameOver()) {
                victory()
                    return 
            }
        } else return
    }


function isLifeLeft(){
    
   const userConfirmation = confirm("MINE!!!😱 you still have life left, will you continue?")

    if(userConfirmation){
      alert('To continue playing you must press a button LIFE LEFT, you have 5 seconds! GO..GO..GO!')

        setTimeout(function(){
            if(!gGame.isLifeON) {
                revealsAllTheMines()
                return gameOver()
            }
                },5000)     
    }else{
        revealsAllTheMines()
        return gameOver()
    }
}


function onCellShown(rowIdx, colIdx){
   const elCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
    elCell.style.backgroundColor = 'lightgray'
    renderCell({ i: rowIdx, j: colIdx }, gBoard[rowIdx][colIdx].inesAroundCount)
    innerTextGetColor(rowIdx,colIdx)
    gBoard[rowIdx][colIdx].isShown = true
    gGame.shownCount++
}


function onCellMarked(elCell, ev, rowIdx, colIdx) {
    if (elCell) {
        // if(!gGame.isON) return
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





