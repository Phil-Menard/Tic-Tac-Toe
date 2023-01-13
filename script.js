const gameboard = document.getElementById('gameboard');
console.log(gameboard);

const gameBoard = (() => {
    const cells = document.querySelectorAll('.square');
    
    //ADD EVENT LISTENER TO THE CELLS
    for (let i = 0; i < cells.length; i++)  {   
        cells[i].addEventListener('click', function(){
            
            //CHECK IF CELL IS EMPTY, MARK THE CELL OF THE SIGN OF THE PLAYER AND CHANGE TURN
            if (cells[i].textContent == '') {   
                if (gameManager.xTurn)  {
                    gameboard.style.boxShadow = "0px 0px 6px 6px rgb(71, 163, 190)";
                    playerOne.selectCell(cells, i);
                }
                else {
                    gameboard.style.boxShadow = "0px 0px 6px 6px rgb(78, 201, 78)";
                    playerTwo.selectCell(cells, i);
                }
            }  
        })
    }
})();

const gameManager = (() => {
    let xTurn = true;
    let isPlaying = true;
    let count = 0;
    const possibilities = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], 
    ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];

    const endGame = function()  {
        if (gameManager.count == 9) {
            alert('END OF THE GAME');
        }
    };   

    return {xTurn, count, isPlaying, endGame, possibilities};
})();

const Player = () => {
    const selectCell = function(cells, index)  {
        if (gameManager.xTurn)  {
            cells[index].textContent = 'X';
            cells[index].style.color = "rgb(42, 137, 42)";
            gameManager.xTurn = false;
            gameManager.count++;
            gameManager.endGame();
            if (gameManager.count >= 5) {
                checkAlignment(cells[index], index, cells);
            }
        }
        else {
            cells[index].textContent = 'O';
            cells[index].style.color = "rgb(28, 107, 130)";
            gameManager.xTurn = true;
            gameManager.count++;
            gameManager.endGame();
            if (gameManager.count >= 5) {
                checkAlignment(cells[index], index, cells);
            }
        }
    };

    const  checkAlignment = function(cell, index, cells)   {
        let lastPossibilities = [];
        //WE ISOLATE THE POSSIBILITES WHICH INCLUDES THE CELL
        for (let i = 0; i < gameManager.possibilities.length; i++)  {
            for (let j = 0; j < 3; j++) {
                if (index == gameManager.possibilities[i][j])   {
                    lastPossibilities.push(gameManager.possibilities[i]);
                }
            }
        }
        console.log({lastPossibilities});
        
        //NOW WE COMPARE IF ANY OF LAST POSSIBILITIES GOT THE SAME SIGN THAN CELL
        for (let i = 0; i < lastPossibilities.length; i++)  {
            let win = true;
            for (let j = 0; j < 3; j++) {
                if (cell.textContent != cells[lastPossibilities[i][j]].textContent)   {
                    win = false;
                    break;
                }
            }
    
            if (win)    {
                console.log('player wins!');
                isPlaying = false;
                break;
            }
        }
    }

    return  {selectCell};
};

const playerOne = Player();
const playerTwo = Player();

/*
case 1 => 0-1-2 / 0-3-6 / 0-4-8
case 2 => 0-1-2 / 1-4-7
case 3 => 0-1-2 / 2-5-8 / 2-4-6
case 4 => 3-4-5 / 0-3-6 
case 5 => 3-4-5 / 1-4-7 / 0-4-8 / 2-4-6
case 6 => 3-4-5 / 2-5-8
case 7 => 6-7-8 / 0-3-6 / 2-4-6
case 8 => 6-7-8 / 1-4-7
case 9 => 6-7-8 / 0-4-8 / 2-5-8

POSSIBILITIES => 0-1-2 / 3-4-5 /6-7-8 / 0-3-6 / 1-4-7 / 2-5-8 / 0-4-8 / 2-4-6

dans une boucle for, on passe tous les elements de l'array 'possibilities' et on selectionne seulement ceux
avec le chiffre égal à l'index de la case sur laquelle le player vient de cliquer. on mets ces elements dans 
un nouveau tableau temporaire.
ensuite on refait une boucle avec le nouveau tableau temporaire, et on regarde si une possibilité a 3 signes
(textContent) identiques. Si c'est le cas, le joueur a gagné, sinon on continue. Si la boucle se termine sans
que le joueur ait gagné alors c'est le tour du joueur suivant ou la fin de la partie.

name, button for start/restart, display congratulations
*/