const Player = (sign) => {
  const getSign = () => {return sign};

  const setSign = (player, cell) => {
    cell.textContent = player.getSign();
  };

  return  {getSign, setSign};
}

const gameManager = (() => {
  const playerOne = document.getElementById('playerOne');
  const playerTwo = document.getElementById('playerTwo');
  const gameboard = document.getElementById('gameboard');
  const cells = document.getElementsByClassName('square');
  const resetButton = document.getElementsByTagName('button')[0];
  const result = document.getElementById('result');
  let firstPlayerPoints = document.getElementById('firstPlayerPoints');
  let secondPlayerPoints = document.getElementById('secondPlayerPoints');

  const firstPlayer = Player('X');
  const secondPlayer = Player('O');  
  const players = [firstPlayer, secondPlayer];
  const possibilities = [['0', '1', '2'], ['3', '4', '5'], ['6', '7', '8'], ['0', '3', '6'], 
    ['1', '4', '7'], ['2', '5', '8'], ['0', '4', '8'], ['2', '4', '6']];

  let round = 0;
  let xPoints = 0;
  let oPoints = 0;
  let isOver = false;
  let turnIsEven = true;
  let hasBeenReset = false;

  const resetGame = () => {
    hasBeenReset = true;
    round = 0;
    isOver = false;
    result.textContent = "";
    turnIsEven = true;
    for (let i = 0; i < cells.length; i++)  {
      cells[i].textContent = "";
    }
    setColors();
  };

  const getPlayerIndex = () => {
    if (turnIsEven) {
      return 0;
    }
    else  {
      return 1;
    }
  }

  const setTurn = () => {
    if (turnIsEven) {
      turnIsEven = false;
    }
    else  {
      turnIsEven = true;
    }
  }

  const setColors = (e) => {
    if(hasBeenReset)  {
      playerTwo.style.textShadow = "none";
      playerOne.style.textShadow = "0px 0px 30px rgb(78, 201, 78)";
      gameboard.style.boxShadow = "0px 0px 6px 6px rgb(78, 201, 78)";
    }
    else  {
      if (!turnIsEven) {
        playerTwo.style.textShadow = "none";
        playerOne.style.textShadow = "0px 0px 30px rgb(78, 201, 78)";
        gameboard.style.boxShadow = "0px 0px 6px 6px rgb(78, 201, 78)"; //green
        e.target.style.color = "rgb(37, 105, 125)";
      }
      else  {
        playerOne.style.textShadow = "none";
        playerTwo.style.textShadow = "0px 0px 30px rgb(71, 163, 190)";
        gameboard.style.boxShadow = "0px 0px 6px 6px rgb(71, 163, 190)"; //blue
        e.target.style.color = "rgb(44, 127, 44)";
      }
    };
  }

  const getWinner = () => {
    if (getPlayerIndex() == 1)  { // if the first player wins
      result.textContent = "Player 1 wins!";
      result.style.color = "rgb(78, 201, 78)"
      xPoints++;
      firstPlayerPoints.textContent = xPoints;
    }
    else  { //if the second player wins
      result.textContent = "Player 2 wins!";
      result.style.color = "rgb(71, 163, 190)"
      oPoints++;
      secondPlayerPoints.textContent = oPoints;
    }
  };

  const getLastPossibilities = (lastPossibilities, index) => {
    if (round >= 4) {
      
      for (let i = 0; i < possibilities.length; i++)  {
        for (let j = 0; j < 3; j++) {
            if (index == possibilities[i][j])   {
                lastPossibilities.push(possibilities[i]);
            }
        }
      }
    }
  };

  const checkLastPossibilities = (lastPossibilities, cell, board) =>  {
    for (let i = 0; i < lastPossibilities.length; i++)  {
      let hasWin = true;
      //0-3-6 / 3-4-5
      for (let j = 0; j < 3; j++) {
        let indexPossibility = lastPossibilities[i][j];
        if (cell.textContent != board[indexPossibility].textContent) {
          hasWin = false;
        }
      }
      if (hasWin)  {
        isOver = true;
        getWinner();
        break;
      }
    }
  };

  const checkWin = (index, cell, board) => {
    let lastPossibilities = [];
    //WE ISOLATE THE POSSIBILITES WHICH INCLUDES THE CELL THAT WAS SELECTED
    getLastPossibilities(lastPossibilities, index);
    checkLastPossibilities(lastPossibilities, cell, board);    
  }

  const checkDraw = () => {
    if (round === 9 && !isOver)  {
      isOver = true;
      result.textContent = "Draw!";
    }
  }

  resetButton.addEventListener('click', resetGame);

  const playRound = (e, indexCell, board) => {
    let player;
    if (hasBeenReset) {
      player = players[0];
    }
    else  {
      player = players[getPlayerIndex()];
    }
    hasBeenReset = false;
    if (!isOver && e.target.textContent == "")  {
      setColors(e);
      player.setSign(player, e.target);
      setTurn();
      checkWin(indexCell, e.target, board);
      round++;
      checkDraw();
    }
  }
  return {playRound};
})();

const gameBoard = (() => {
  const board = document.getElementsByClassName('square');

  for (let i = 0; i < board.length; i++)  {
    board[i].addEventListener('click', function(e) {
      gameManager.playRound(e, i, board);
    });
  }
})();