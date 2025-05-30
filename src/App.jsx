import { useState, useEffect } from 'react'
import { fetchOwnedGames, fetchSteamGameDetails,fetchSteamAchievements, getSteamGameIconUrl } from './api/steam'
import { fetchOwnedGOGGames } from './api/gog'
import { FiFilter, FiChevronDown } from 'react-icons/fi'
import FilterMenu from './components/FilterMenu'

function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [sortOption, setSortOption] = useState('name')
  
  const handleSort = (option) => {
    setSortOption(option)
    setFilterMenuOpen(false)
  }

  const sortGames = (games) => {
    switch (sortOption) {  // Changed from sortType to sortOption
      case 'name':
        return [...games].sort((a, b) => a.name.localeCompare(b.name));
      case 'playtime':
        return [...games].sort((a, b) => b.playtime_forever - a.playtime_forever);
      case 'recent':
        return [...games].sort((a, b) => b.rtime_last_played - a.rtime_last_played);
      case 'success':
        return [...games].sort((a, b) => {
          const getCompletionRate = (game) => {
            if (!game.achievements || game.achievements.length === 0) return 0;
            const completed = game.achievements.filter(ach => ach.achieved).length;
            return (completed / game.achievements.length) * 100;
          };
          
          return getCompletionRate(b) - getCompletionRate(a); // Tri décroissant
        });
      default:
        return games;
    }
  };

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true)
        const ownedGames = await fetchOwnedGames()
        const ownedGOGGames = await fetchOwnedGOGGames()
        // Combine both arrays of games
        setGames([...ownedGames, ...ownedGOGGames])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [])

  return (
    <div className="container">
      <div className='header-games'>
        <h2>Mes Jeux</h2>
        <FiFilter 
          className="filter-icon" 
          onClick={() => setFilterMenuOpen(!filterMenuOpen)}  // Fixed onClick handler
        />
        <FilterMenu 
          isOpen={filterMenuOpen} 
          onSort={handleSort} 
          onClose={() => setFilterMenuOpen(false)} 
        />
      </div>
      
      {loading && <div>Chargement...</div>}
      {error && <div className="error">Erreur: {error}</div>}
      
      <div className="games-list">
        {sortGames(games).map((game) => (
          <div key={game.appid} className="game-card">
            <div className='game-name-and-chevron'>
                <img 
                  src={getSteamGameIconUrl(game.appid, game.img_icon_url)} 
                  alt={game.name} 
                  className="game-icon" 
                />
                <h3>{game.name}</h3>
                <FiChevronDown className="chevron-icon"/>
            </div>
            <p>Temps de jeu: {Math.round(game.playtime_forever / 60)} heures</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
