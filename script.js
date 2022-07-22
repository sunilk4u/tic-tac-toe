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
  const board = [
    ["X", "X", "X"],
    ["X", "X", "X"],
    ["X", "X", "X"],
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
    const tileElements = Array.from(document.getElementsByClassName("tile"));
    tileElements.forEach((tile) => {
      tile.addEventListener(
        "click",
        (eventFunc = () => {
          nextMove(tileElements.indexOf(tile) + 1);
        }),
        { once: true }
      );
    });
    document.querySelector(".choose-player").disabled = true;
    document.querySelector(".choose-player").style["background-color"] =
      "#afafaf";
  }

  function nextMove(index) {
    if (player2.isAI === true) {
      //AI work here
    } else {
      if (player1.isTurn === true) {
        displayController.displayNextMove(index, player1);
        displayController.changeTileColor(index, "#7cff7c")
        document.getElementById("res-display").innerHTML = "Player 2's Move";
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
      }
      else {
        displayController.displayNextMove(index, player2);
        displayController.changeTileColor(index, "#ff7474")
        document.getElementById("res-display").innerHTML = "Player 1's Move";
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
      }
    }
  }

  function reset() {
    document.querySelector(".choose-player").disabled = false;
    document.querySelector(".choose-player").style["background-color"] =
      "rgb(0, 193, 0)";
      document.getElementById("res-display").innerHTML = `Let's see who is <span style="color: red;"><i>Tic - Tac - Toe</i></span> champion!`;
  }


  return { board, createPlayers, startGame, reset };
})();

const displayController = (() => {
  function setupTiles() {
    const tiles = document.getElementsByClassName("tile");
    Array.from(tiles).forEach((tile) => {
      tile.innerHTML = "";
      tile.style['background-color'] = "#fff";
    });
  }

  function displayNextMove(index, player) {
    const tileDiv = document.querySelector('[data-attribute="' + index + '"]');
    tileDiv.textContent = player.symbol;
  }

  function changeTileColor(index, color) {
    const tileDiv = document.querySelector('[data-attribute="' + index + '"]');
    tileDiv.style['background-color'] = color;
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
