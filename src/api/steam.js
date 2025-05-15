import axios from 'axios';

const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;

export async function fetchSteamAchievements(steamId, appId) {
  try {
    const response = await axios.get(
      'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v1/',
      {
        params: {
          key: STEAM_API_KEY,
          steamid: steamId,
          appid: appId,
        },
      }
    );

    const achievements = response.data.playerstats.achievements;
    return achievements;
  } catch (error) {
    console.error('Erreur lors du fetch des achievements Steam :', error);
    return [];
  }
}
