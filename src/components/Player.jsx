import React, { useState } from 'react';

const Player = ({ name, symbol, isActive }) => {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing((prev) => !prev);

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            value={playerName}
            onChange={handlePlayerNameChange}
            required
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>

      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
};

export default Player;
