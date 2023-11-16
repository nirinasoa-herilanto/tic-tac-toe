import { useState } from 'react';

import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = derivedActivePlayer(gameTurns);

  const handlePlayerGame = (rowIndex, colIndex) => {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={'Player 1'}
            symbol={'X'}
            isActive={activePlayer === 'X'}
          />
          <Player
            name={'Player 2'}
            symbol={'O'}
            isActive={activePlayer === 'O'}
          />
        </ol>

        <GameBoard turns={gameTurns} onSelectSquare={handlePlayerGame} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
