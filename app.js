const displayCurrentPlayer = document.querySelector('#current-player');
const squares = document.querySelectorAll('.grid div');
const resetBtn = document.querySelector('#Reset');
const result = document.querySelector('#result');

let currentPlayer = 1;

for (let i = 0, len = squares.length; i < len; i++) {
  const square = squares[i];
  square.onclick = () => {
    // if the square below your current square is taken, you can go on top of it.
    const belowSquare = squares[i + 7];
    console.log(belowSquare, i)
    if (belowSquare && !belowSquare.classList.contains('taken')) {
      alert("Can't go here");
      return;
    }
    square.classList.add('taken');
    square.classList.add('player-' + currentPlayer);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    displayCurrentPlayer.textContent = currentPlayer;
    checkBoardForWinner();
  };
}

resetBtn.onclick = () => {
  for (const square of squares) {
    square.className = '';
  }
  displayCurrentPlayer.textContent = 1;
};

const getPlayerOnSquare = square => {
  if (!square) return null;
  const { classList } = square;
  return classList.contains('player-1')
    ? 1
    : classList.contains('player-2')
      ? 2
      : null;
};
function checkBoardForWinner() {
  for (let baseSquareIndex = 0; baseSquareIndex < squares.length; baseSquareIndex++) {
    const directionIndexDifferences = [
      -6, // Northeast
      1, // East
      8, // Southeast
      7 // South
    ];
    // Look 4 squares in each direction from baseSquareIndex
    // If each of those squares has the same player, they win
    const playersOnSquares = directionIndexDifferences.map(
      difference => Array.from(
        { length: 4 },
        (_, i) => getPlayerOnSquare(squares[baseSquareIndex + (i * difference)])
      )
    );
    const foundSequence = playersOnSquares.find(
      players => players[0] && players.every(player => player === players[0])
    );
    if (foundSequence) {
      result.textContent = `Player ${foundSequence[0]} wins!`;
    }
  }
}
