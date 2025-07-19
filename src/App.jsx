import { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard.jsx';
import PokemonModal from './components/PokemonModal.jsx';
import './App.css';

function App() {
    const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const itemsPerPage = 18;

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1008'); // All Gen 1-9
        const data = await response.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokeData = await fetch(pokemon.url).then(res => res.json());
            return pokeData;
          })
        );
        setAllPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };
    fetchAllPokemons();
  }, []);

  useEffect(() => {
    const filtered = allPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1);
  }, [searchTerm, allPokemon]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokedex-container">
      <header className="pokedex-header">
        <h1 className="pokedex-title">Pokédex</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Chargement des Pokémon...</div>
      ) : (
        <>
          <div className="pokemon-grid">
            {paginatedPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={openModal} />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              &lt;
            </button>
            <span className="pagination-info">Page {currentPage} sur {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              &gt;
            </button>
          </div>
        </>
      )}

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
