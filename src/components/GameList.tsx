import React from 'react';

interface Game {
  _id: string;
  name: string;
  sport: string;
}

interface GameListProps {
  games: Game[];
  votes: Record<string, number>;
}

const GameList: React.FC<GameListProps> = ({ games, votes }) => {
  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            {game.name} - {game.sport} (Votes: {votes[game._id] || 0})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
