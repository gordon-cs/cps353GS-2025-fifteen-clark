const area = document.getElementById("puzzlearea");
const tiles = [...area.children]; // array of the 15 tiles
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

tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    const i = board.indexOf(tile);
    if (isAdjacent(i, emptyIndex)) {
      // swap with empty
      board[emptyIndex] = tile;
      board[i] = null;
      emptyIndex = i;
      render();
    }
  });
});