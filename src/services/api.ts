import axios from 'axios';

export const getGames = async () => {
  try {
    const response = await axios.get('/api/games');
    return response.data;
  } catch (error) {
    console.error('Error fetching games', error);
    throw error;
  }
};

export const getVotes = async () => {
  try {
    const response = await axios.get('/api/votes');
    return response.data;
  } catch (error) {
    console.error('Error fetching votes', error);
    throw error;
  }
};

export const voteForGame = async (gameId: string) => {
  try {
    const response = await axios.post('/api/vote', { gameId });
    return response.data;
  } catch (error) {
    console.error('Error voting for game', error);
    throw error;
  }
};
