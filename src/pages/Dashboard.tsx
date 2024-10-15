import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import GameList from '../components/GameList';
import ChannelSelector from '../components/ChannelSelector';
import Notification from '../components/Notification';

interface Game {
  _id: string;
  name: string;
  sport: string;
}

interface Channel {
  id: number;
  channelNumber: string;
  assignedGameId: string;
}

const Dashboard: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [channels, setChannels] = useState<Channel[]>([
    { id: 1, channelNumber: '101', assignedGameId: '' },
    { id: 2, channelNumber: '102', assignedGameId: '' },
    { id: 3, channelNumber: '103', assignedGameId: '' },
    { id: 4, channelNumber: '104', assignedGameId: '' },
  ]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    // Fetch games
    axios.get('/api/games').then((response) => setGames(response.data));

    // Fetch votes
    axios.get('/api/votes').then((response) => {
      const voteData = response.data.reduce((acc: Record<string, number>, curr: any) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});
      setVotes(voteData);
    });

    // WebSocket for real-time vote updates
    const socket = io('http://localhost:3000');
    socket.on('voteUpdate', (data) => {
      setVotes((prevVotes) => ({
        ...prevVotes,
        [data.gameId]: data.votes,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChannelChange = (channelId: number, gameId: string) => {
    const updatedChannels = channels.map((channel) =>
      channel.id === channelId ? { ...channel, assignedGameId: gameId } : channel
    );
    setChannels(updatedChannels);
    const game = games.find((g) => g._id === gameId);
    setNotification(`Switched TV ${channelId} to ${game ? game.name : 'a game'}`);
  };

  return (
    <div>
      {notification && <Notification message={notification} />}
      <GameList games={games} votes={votes} />
      <ChannelSelector channels={channels} games={games} onChange={handleChannelChange} />
    </div>
  );
};

export default Dashboard;
