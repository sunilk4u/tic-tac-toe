/* This game is created as a learning challenge for The odin Project Full stack developemnt
   Author: Sunil Kumar
   Bio: https://github.com/sunilk4u/
*/

// Player factory method return object
const players = (selectedPlayer, selectedSymbol, turn) => {
  let isAI = selectedPlayer;
  let symbol = selectedSymbol;
  let isTurn = turn;
  let move;
  return {
    isAI,
    symbol,
    isTurn,
    move,
  };
};

// gameBoard contains all the logic for the game play
const gameBoard = (() => {

  // create a panel for tic tac toe with blank (N represents blank)
  let board = ["N", "N", "N", "N", "N", "N", "N", "N", "N"];

  // contains all the winnning combinations
  const winBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let player1, player2, otherSymbol;

  // Ai_Plays contains for calculating nect move for AI
  function AI_Plays() {

    // checks if there is any move left to play (Draw condition)
    function isMoveLeft() {
      if (board.includes("N")) {
        return true;
      }
      return false;
    }

    // evaluates if there is a winning condition by player or AI
    function evaluate(depth) {
      let X_Match = false,
        O_Match = false;

      // match with every winning combinations
      winBoard.every((match) => {
        if (
          board[match[0]] === "X" &&
          board[match[1]] === "X" &&
          board[match[2]] === "X"
        ) {
          X_Match = true;
          return false;
        }
        if (
          board[match[0]] === "O" &&
          board[match[1]] === "O" &&
          board[match[2]] === "O"
        ) {
          O_Match = true;
          return false;
        }

        return true;
      });

      // check if X is won with respect to player and return score
      if (X_Match === true) {
        if (player1.symbol === "X") {
          return -10;           
        } else {
          return +10;
        }
      }

      // check if O is won with respect to player and returns score
      if (O_Match === true) {
        if (player2.symbol === "O") {
          return +10;
        } else {
          return -10;
        }
      }

      return 0;   // if no win then return 0
    }

    // minimax creates every possible outcome with moves
    function minimax(depth, isMax) {
      score = evaluate(depth);
      if (score === +10) {
        return score;
      }

      if (score === -10) {
        return score;
      }

      if (isMoveLeft() === false) {
        return 0;
      }

      if (isMax) {
        best = -Infinity;

        for (let i = 0; i < 9; i++) {
          if (board[i] === "N") {
            board[i] = player2.symbol;

            best = Math.max(best, minimax(depth + 1, !isMax));

            board[i] = "N";
          }
        }
        return best;
      } else {
        best = Infinity;

        for (let i = 0; i < 9; i++) {
          if (board[i] === "N") {
            board[i] = player1.symbol;

            best = Math.min(best, minimax(depth + 1, !isMax));

            board[i] = "N";
          }
        }
        return best;
      }
    }

    // finds the best move to take in entire board for AI to win 
    function findBestMove() {
      let bestVal = -Infinity;
      player2.move = -1;

      for (let i = 0; i < 9; i++) {
        if (board[i] === "N") {
          board[i] = player2.symbol;
          moveValue = minimax(0, false);
          board[i] = "N";

          if (moveValue > bestVal) {
            bestVal = moveValue;
            player2.move = i;
          }
        }
      }
    }
    findBestMove();
  }

  // creates players object
  function createPlayers() {
    const selectedPlayer = document.getElementById("player").value;
    const selectedSymbol = document.getElementById("symbol").value;
    selectedSymbol === "X" ? (otherSymbol = "O") : (otherSymbol = "X");
    player2 =
      selectedPlayer === "AI"
        ? players(true, otherSymbol, false)
        : players(false, otherSymbol, false);
    player1 = players(false, selectedSymbol, true);
  }

  // starts the game
  function startGame() {
    document.getElementById("res-display").innerHTML =
      "Lets's Begin! Your move first.";
    addListen();                                              // adds event listeners to each move on the board
    document.querySelector(".choose-player").disabled = true;
    document.querySelector(".end-game").disabled = false;
    document.querySelector(".choose-player").style["background-color"] =
      "#afafaf";
  }

  // nextMove performs the next move operation on board
  function nextMove(index) {

    // check if the player 2 is selected as AI and perform according operations
    if (player2.isAI === true) {
      document.getElementById("res-display").innerHTML =
        "Good Luck, Beating the AI ; )";
      board[index - 1] = player1.symbol;
      displayController.displayNextMove(index, player1);
      displayController.changeTileColor(index, "#7cff7c");

      // perform move for the AI
      try {
        AI_Plays();
        board[player2.move] = player2.symbol;
        displayController.displayNextMove(player2.move + 1, player2);
        displayController.changeTileColor(player2.move + 1, "#ff7474");
        checkWin_player();
      } catch (error) {
        checkWin_player();
      }
    } else {
      if (player1.isTurn === true) {
        board[index - 1] = player1.symbol;
        displayController.displayNextMove(index, player1);
        displayController.changeTileColor(index, "#7cff7c");
        document.getElementById("res-display").innerHTML = "Player 2's Move";
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
      } else {
        board[index - 1] = player2.symbol;
        displayController.displayNextMove(index, player2);
        displayController.changeTileColor(index, "#ff7474");
        document.getElementById("res-display").innerHTML = "Player 1's Move";
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
      }
      checkWin_player();
    }
  }

  // checks if there is a winning player or draw
  function checkWin_player() {
    let X_Match = false,
      O_Match = false;
    
    // check winning matches combination on board
    winBoard.every((match) => {
      if (
        board[match[0]] === "X" &&
        board[match[1]] === "X" &&
        board[match[2]] === "X"
      ) {
        X_Match = true;
        return false;
      }
      if (
        board[match[0]] === "O" &&
        board[match[1]] === "O" &&
        board[match[2]] === "O"
      ) {
        O_Match = true;
        return false;
      }

      return true;
    });

    // check if it is a draw
    if (!board.includes("N")) {
      document.getElementById("res-display").innerHTML = "Its a Draw";
      removeListen();
    }

    // check if X won
    if (X_Match === true) {
      if (player1.symbol === "X") {                           
        document.getElementById("res-display").innerHTML =
          "Player 1 won the match";
      } else {
        if (player2.isAI === true) {  
          document.getElementById("res-display").innerHTML = "AI won the match";
        } else {
          document.getElementById("res-display").innerHTML =
            "Player 2 won the match";
        }
      }
      removeListen();     // remove the event listener from the moves on the board
    }
    // check if O has won
    if (O_Match === true) {
      if (player1.symbol === "O") {
        document.getElementById("res-display").innerHTML =
          "Player 1 won the match";
      } else {
        if (player2.isAI === true) {
          document.getElementById("res-display").innerHTML = "AI won the match";
        } else {
          document.getElementById("res-display").innerHTML =
            "Player 2 won the match";
        }
      }
      removeListen();      // remove the event listener from the moves on the board
    }
  }

  // calls nextMove function with data-attribute
  const eventFunc = function () {
    const divNum = this.getAttribute("data-attribute");
    nextMove(divNum);
  };

  // adds event listener to the divs tile class
  function addListen() {
    const tileElements = Array.from(document.getElementsByClassName("tile"));
    tileElements.forEach((tile) => {
      tile.addEventListener("click", eventFunc, { once: true });
    });
  }

  // removes event listener to the divs tile class
  function removeListen() {
    const tileElements = Array.from(document.getElementsByClassName("tile"));
    tileElements.forEach((tile) => {
      tile.removeEventListener("click", eventFunc, { once: true });
    });
  }
  
  // resets the game and the board
  function reset() {
    removeListen();
    board = ["N", "N", "N", "N", "N", "N", "N", "N", "N"];
    document.querySelector(".choose-player").disabled = false;
    document.querySelector(".choose-player").style["background-color"] =
      "rgb(0, 193, 0)";
    document.getElementById(
      "res-display"
    ).innerHTML = `Let's see who is <span style="color: red;"><i>Tic - Tac - Toe</i></span> champion!`;
    document.querySelector(".end-game").disabled = true;
  }

  return { board, createPlayers, startGame, reset };
})();

// displayController controls the setup and display of tiles
const displayController = (() => {

  // sets up tiles for the new game
  function setupTiles() {
    const tiles = document.getElementsByClassName("tile");
    Array.from(tiles).forEach((tile) => {
      tile.innerHTML = "";
      tile.style["background-color"] = "#fff";
    });
  }

  // displays next move on the div tiles
  function displayNextMove(index, player) {
    const tileDiv = document.querySelector('[data-attribute="' + index + '"]');
    tileDiv.textContent = player.symbol;
  }

  // changes tile color on the divs
  function changeTileColor(index, color) {
    const tileDiv = document.querySelector('[data-attribute="' + index + '"]');
    tileDiv.style["background-color"] = color;
  }

  return {
    setupTiles,
    displayNextMove,
    changeTileColor,
  };
})();

// gameFlow function handles the flow of game
const gameFlow = (() => {

  // start a new game fresh
  function startNewGame() {
    displayController.setupTiles();
    gameBoard.createPlayers();
    gameBoard.startGame();
  }

  // end the game and reset everything
  function endGame() {
    displayController.setupTiles();
    gameBoard.reset();
  }

  return {
    startNewGame,
    endGame,
  };
})();
