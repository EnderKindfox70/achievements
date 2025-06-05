import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());

const PORT = 3001;
const STEAM_API_KEY = process.env.VITE_STEAM_API_KEY;
const STEAM_ID = process.env.VITE_STEAM_ID;

// Endpoint to get owned games
app.get('/api/steam/games', async (req, res) => {
  try {
    const response = await axios.get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`, {
        params: {
          key: STEAM_API_KEY,
          steamid: STEAM_ID,
          format: 'json',
          include_appinfo: 1
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Steam API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Get user's GOG games
app.get('/api/gog/games', async (req, res) => {
  try {
    const response = await axios.get('https://api.gog.com/v1/account/games', {
      headers: {
        'Authorization': `Bearer ${await getGOGToken()}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('GOG API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch GOG games' });
  }
});

// Get game details
app.get('/api/gog/games/:gameId', async (req, res) => {
  const { gameId } = req.params;
  try {
    const response = await axios.get(`https://api.gog.com/v2/games/${gameId}`, {
      headers: {
        'Authorization': `Bearer ${await getGOGToken()}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('GOG API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

app.get('/api/steam/achievements/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const response = await axios.get(
      `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/`, {
        params: {
          key: STEAM_API_KEY,
          steamid: STEAM_ID,
          appid: gameId,
          format: 'json' 
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 400) {
      res.json({ playerstats: { achievements: [] } });
    } else {
      console.error('Steam API Error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});