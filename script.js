const players = (selectedPlayer, selectedSymbol) => {
  let isAI = selectedPlayer;
  let symbol = selectedSymbol;

  return {
    isAI,
    symbol,
  };
};

const gameBoard = (() => {
  const board = [
    ["X", "X", "X"],
    ["X", "X", "X"],
    ["X", "X", "X"],
  ];
  let player;

  function createPlayers() {
    const selectedPlayer = document.getElementById("player").value;
    const selectedSymbol = document.getElementById("symbol").value;
    player =
      selectedPlayer === "AI"
        ? players(true, selectedSymbol)
        : players(false, selectedSymbol);
  }
  function startGame() {
    document.getElementById("res-display").innerHTML =
      "Lets's Begin! Your move first.";
    const tileElements = Array.from(document.getElementsByClassName("tile"));
    tileElements.forEach((tile) => {
      tile.addEventListener("click", eventFunc = () => {
        nextMove(tileElements.indexOf(tile) + 1);
      });
    });
    document.querySelector(".choose-player").disabled = true;
    document.querySelector(".choose-player").style["background-color"] =
      "#afafaf";
  }

  function nextMove(index) {
    displayController.displayNextMove(index, player, symbol);
    if (player.isAI === true) {

    }
    else {
      document.getElementById("res-display").innerHTML =
      "Player 2's Move";
    }
  }

  return { board, createPlayers, startGame };
})();

const displayController = (() => {
  function setupTiles() {
    const tiles = document.getElementsByClassName("tile");
    Array.from(tiles).forEach((tile) => {
      tile.innerHTML = "";
    });
  }

  function displayNextMove(index, player) {
    const tileDiv = document.querySelector('[data-attribute="' + index + '"]');
    tileDiv.textContent = player.symbol;
    tileDiv.removeEventListener("click", eventFunc);
  }

  return {
    setupTiles, displayNextMove
  };
})();

const gameFlow = (() => {
  function startNewGame() {
    displayController.setupTiles();
    gameBoard.createPlayers();
    gameBoard.startGame();
  }

  return {
    startNewGame,
  };
})();
