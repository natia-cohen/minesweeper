'use strict'


function onClickHint() {
    gGame.isHintON = true
    const elBtn = document.querySelector('.btn-hint')

    elBtn.innerText = '💡'
    elBtn.style.fontSize = '20px'

   setTimeout(() => {
    elBtn.innerText = 'HINT'
    elBtn.style.fontSize = '14px'
   
   },2000)

  
}

function revealForSecond(rowIdx,colIdx){
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
           

            if (!gBoard[i][j].isShown){
                const currCell = gBoard[i][j]
                const elCell = document.querySelector(`.cell-${i}-${j}`)
            
                elCell.style.backgroundColor = 'lightgray'
                if(currCell.isMarked)continue

                if(currCell.isMine ){
                    renderCell({ i: i, j: j }, MINE)
                }else{
                    renderCell({ i: i, j: j}, currCell.inesAroundCount)
                    innerTextGetColor(i, j)  
                }
               
            } 
        }
    }
    setTimeout(() => {
        
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            
            if (j < 0 || j >= gBoard[i].length) continue

            if(gBoard[i][j].isMarked){
                elCell.style.backgroundColor = '#7551d9'
                continue
            }
           

            if (!gBoard[i][j].isShown){
                
                elCell.style.backgroundColor = '#7551d9'
                
                    renderCell({ i: i, j: j }, EMPTY)

             
            } 
        }
    }

       gGame.hintsCount--
    gGame.isHintON = false   
    }, 1000)
   

}
