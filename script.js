const players = (selectedPlayer, selectedSymbol, turn) => {
  let isAI = selectedPlayer;
  let symbol = selectedSymbol;
  let isTurn = turn;

  return {
    isAI,
    symbol,
    isTurn,
  };
};

const gameBoard = (() => {
  let board = ["N", "N", "N", "N", "N", "N", "N", "N", "N"];
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

  function startGame() {
    document.getElementById("res-display").innerHTML =
      "Lets's Begin! Your move first.";
    addListen();
    document.querySelector(".choose-player").disabled = true;
    document.querySelector(".end-game").disabled = false;
    document.querySelector(".choose-player").style["background-color"] =
      "#afafaf";
  }

  function nextMove(index) {
    if (player2.isAI === true) {
      //AI work here
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
    }
    checkWin();
  }

  function checkWin() {
    let X_Match = false,
      O_Match = false,
      draw = false;
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

    if (!board.includes("N")) {
      document.getElementById("res-display").innerHTML = "Its a Draw";
      removeListen();
    }

    if (X_Match === true) {
      document.getElementById("res-display").innerHTML =
        "Player 1 won the match";
      removeListen();
    }
    if (O_Match === true) {
      document.getElementById("res-display").innerHTML =
        "Player 2 won the match";
      removeListen();
    }
  }

  const eventFunc = function () {
    const divNum = this.getAttribute("data-attribute");
    nextMove(divNum);
  };

  function addListen() {
    const tileElements = Array.from(document.getElementsByClassName("tile"));
    tileElements.forEach((tile) => {
      tile.addEventListener("click", eventFunc, { once: true });
    });
  }

  function removeListen() {
    const tileElements = Array.from(document.getElementsByClassName("tile"));
    tileElements.forEach((tile) => {
      tile.removeEventListener("click", eventFunc, { once: true });
    });
  }

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

const displayController = (() => {
  function setupTiles() {
    const tiles = document.getElementsByClassName("tile");
    Array.from(tiles).forEach((tile) => {
      tile.innerHTML = "";
      tile.style["background-color"] = "#fff";
    });
  }

  function displayNextMove(index, player) {
    const tileDiv = document.querySelector('[data-attribute="' + index + '"]');
    tileDiv.textContent = player.symbol;
  }

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

const gameFlow = (() => {
  function startNewGame() {
    displayController.setupTiles();
    gameBoard.createPlayers();
    gameBoard.startGame();
  }

  function endGame() {
    displayController.setupTiles();
    gameBoard.reset();
  }

  return {
    startNewGame,
    endGame,
  };
})();
