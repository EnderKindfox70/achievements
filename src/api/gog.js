import axios from 'axios';

const GOG_API_URL = 'https://api.gog.com/v1';
const GOG_CLIENT_ID = import.meta.env.VITE_GOG_CLIENT_ID;
const GOG_CLIENT_SECRET = import.meta.env.VITE_GOG_CLIENT_SECRET;

export async function fetchOwnedGOGGames() 
{
  try 
  {
    const response = await axios.get(`${GOG_API_URL}/account/games`, {
      headers: 
      {
        'Authorization': `Bearer ${await getGOGToken()}`,
      }
    });
    return response.data.items || [];
    }    
    catch (error) 
    {
        console.error('Erreur lors du fetch des jeux GOG :', error);
        return [];
    }
}

export async function fetchGOGAchievements(gameId) {
  try {
    const response = await axios.get(
      `${GOG_API_URL}/games/${gameId}/achievements`,
      {
        headers: {
          'Authorization': `Bearer ${await getGOGToken()}`,
        }
      }
    );

    return response.data.items || [];
  } catch (error) {
    console.error('Erreur lors du fetch des achievements GOG :', error);
    return [];
  }
}

async function getGOGToken() {
  try {
    const response = await axios.post('https://auth.gog.com/token', {
      client_id: GOG_CLIENT_ID,
      client_secret: GOG_CLIENT_SECRET,
      grant_type: 'client_credentials'
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Erreur lors de l\'authentification GOG :', error);
    throw error;
  }
}
