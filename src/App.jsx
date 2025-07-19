import { useState, useEffect } from 'react';
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

  
  
  return (
    <div className="pokedex-container">
      <header className="pokedex-header">
        <h1 className="pokedex-title">Pokédex</h1>
      </header>
    </div>
  );
}

export default App;
