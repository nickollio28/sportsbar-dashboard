import React from 'react';

interface Channel {
  id: number;
  channelNumber: string;
  assignedGameId: string;
}

interface Game {
  _id: string;
  name: string;
}

interface ChannelSelectorProps {
  channels: Channel[];
  games: Game[];
  onChange: (channelId: number, gameId: string) => void;
}

const ChannelSelector: React.FC<ChannelSelectorProps> = ({ channels, games, onChange }) => {
  return (
    <div>
      {channels.map((channel) => (
        <div key={channel.id}>
          <h3>TV {channel.id} (Channel {channel.channelNumber})</h3>
          <select
            value={channel.assignedGameId || ''}
            onChange={(e) => onChange(channel.id, e.target.value)}
          >
            <option value="">Select a Game</option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default ChannelSelector;
