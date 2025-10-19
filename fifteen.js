/*
  this is the javascript for a 15-puzzle game.
  the HTML and CSS are in fifteen.html and fifteen.css
  the game consists of a 4x4 grid with 15 numbered tiles and one empty space.
  the player can click on a tile adjacent to the empty space to move it into the empty space.
*/

const area = document.getElementById("puzzlearea");
const shuffleButton = document.getElementById("shufflebutton");
const tiles = [...area.children]; // array of the 15 tiles
let totalmoves = 0;
let board = Array(16).fill(null); 

// 16 positions, last is empty
for (let i = 0; i < 15; i++) board[i] = tiles[i];
let emptyIndex = 15;


function render() {
  for (let i = 0; i < 16; i++) { // for each position
    const tile = board[i];
    if (!tile) continue; // skip empty tile
    const row = Math.floor(i / 4), col = i % 4;
    tile.style.gridRowStart = row + 1;
    tile.style.gridColumnStart = col + 1;
  }
  updateClickable(); // update tiles that are clickable
}
render();

 // check if two indices are adjacent
function isAdjacent(a, b) {
  const arow = Math.floor(a / 4), acol = a % 4;
  const brow = Math.floor(b / 4), bcol = b % 4;
  return (arow === brow && Math.abs(acol - bcol) === 1) ||
         (acol === bcol && Math.abs(arow - brow) === 1);
}

// updates which tiles are clickable
function updateClickable() {
  tiles.forEach(tile => {
    const i = board.indexOf(tile);
    if (isAdjacent(i, emptyIndex)) {
      // Mark as clickable
      tile.classList.add("clickable");
      tile.style.cursor = "pointer";
    } else {
      // Not clickable
      tile.classList.remove("clickable");
      tile.style.cursor = "default";
    }
  });
}

// shuffle the board
shuffleButton.addEventListener("click", () => {
  for (let i = 0; i < 300; i++) {
    // get all adjacent tiles
    const adjacentTiles = [];
    tiles.forEach(tile => {
      const index = board.indexOf(tile);
      if (isAdjacent(index, emptyIndex)) adjacentTiles.push(tile);
    });
    // pick a random adjacent tile to swap
    const tileToSwap = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
    const tileIndex = board.indexOf(tileToSwap);
    // swap
    board[emptyIndex] = tileToSwap;
    board[tileIndex] = null;
    emptyIndex = tileIndex;
  }
  render();
});

function isSolved() {
  for (let i = 0; i < 15; i++) {
    if (board[i] !== tiles[i]) return false;
  }
  return board[15] === null;
}

function handleWin() {
  setTimeout(() => {
    alert("Congratulations, you solved the puzzle! Total moves: " + totalmoves);
    totalmoves = 0; // reset move count
  }, 100);
}

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    const i = board.indexOf(tile);
    if (isAdjacent(i, emptyIndex)) {
      // swap with empty
      board[emptyIndex] = tile;
      board[i] = null;
      emptyIndex = i;
      render();
      totalmoves += 1;

      if (isSolved()) {
        handleWin();
      }
    }
  });
});