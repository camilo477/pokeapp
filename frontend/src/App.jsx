import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [search, setSearch] = useState('ditto')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchPokemon = async (name) => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`/api/pokemon/${name}/`)
      if (!response.ok) {
        throw new Error('No se encontró el Pokémon')
      }
      const data = await response.json()
      setPokemon(data)
    } catch (err) {
      setPokemon(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemon('ditto')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search.trim()) return
    fetchPokemon(search.trim().toLowerCase())
  }

  return (
    <div className="app">
      <h1>PokeApp</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Escribe un Pokémon"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {pokemon && (
        <div className="card">
          <h2>{pokemon.name} #{pokemon.id}</h2>
          <img
            src={pokemon.official_artwork || pokemon.sprite}
            alt={pokemon.name}
            width="200"
          />

          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
          <p><strong>Experiencia base:</strong> {pokemon.base_experience}</p>
          <p><strong>Tipos:</strong> {pokemon.types.join(', ')}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.join(', ')}</p>

          <h3>Stats</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App