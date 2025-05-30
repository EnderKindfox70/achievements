import axios from 'axios';

const STEAM_API_KEY = import.meta.env.VITE_STEAM_API_KEY;
const STEAM_ID = import.meta.env.VITE_STEAM_ID;

export async function fetchSteamAchievements(gameId) {
  try {
    const response = await fetch(`http://localhost:3001/api/steam/achievements/${gameId}`);
    const data = await response.json();
    return data.game.availableGameStats.achievements || [];
  } catch (error) {
    console.error('Error fetching Steam achievements:', error);
    throw error;
  }
}

export async function fetchSteamGameDetails(gameId) {
  try {
    const response = await fetch(`http://localhost:3001/api/steam/games/${gameId}`);
    const data = await response.json();
    return data.response.game || {};
  } catch (error) {
    console.error('Error fetching Steam game details:', error);
    throw error;
  }
}

export async function fetchOwnedGames() {
  try {
    const response = await fetch(`http://localhost:3001/api/steam/games`);
    const data = await response.json();
    return data.response.games || [];
  } catch (error) {
    console.error('Error fetching Steam games:', error);
    throw error;
  }
}

export function getSteamGameIconUrl(gameId, iconHash) {
  if (!iconHash) return null;
  return `http://media.steampowered.com/steamcommunity/public/images/apps/${gameId}/${iconHash}.jpg`;
}
