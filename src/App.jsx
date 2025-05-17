import { useState, useEffect } from 'react'
import { fetchOwnedGames } from './api/steam'
 import { fetchOwnedGOGGames } from './api/gog'

function App() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true)
        const ownedGames = await fetchOwnedGames()
        const ownedGOGGames = await fetchOwnedGOGGames()
        setGames(ownedGames, ownedGOGGames)
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
      <h1>Mes Jeux Steam</h1>
      
      {loading && <div>Chargement...</div>}
      {error && <div className="error">Erreur: {error}</div>}
      
      <div className="games-list">
        {games.map((game) => (
          <div key={game.appid} className="game-card">
            <h3>{game.name}</h3>
            <p>Temps de jeu: {Math.round(game.playtime_forever / 60)} heures</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
