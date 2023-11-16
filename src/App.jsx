import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './utils/winning-combination';
import GameOver from './components/GameOver';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

function deriveGameBoard(gameTurns) {
  // will create a Deep copy of INITIAL_GAME_BOARD (independant)
  // and the change in gameBoard will not affect INITIAL_GAME_BOARD
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  // let gameBoard = INITIAL_GAME_BOARD.slice(); // will create a shallow copy

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handlePlayerGame = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = derivedActivePlayer(prevGameTurns);

      // in immutable way, best practice
      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  };

  const handlePlayersChange = (symbol, playerName) => {
    setPlayers((prevPlayer) => ({
      ...prevPlayer,
      [symbol]: playerName,
    }));
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol={'X'}
            isActive={activePlayer === 'X'}
            onPlayerNameChange={handlePlayersChange}
          />
          <Player
            name={PLAYERS.O}
            symbol={'O'}
            isActive={activePlayer === 'O'}
            onPlayerNameChange={handlePlayersChange}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard turns={gameBoard} onSelectSquare={handlePlayerGame} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
