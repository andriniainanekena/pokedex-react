function PokemonCard({ pokemon, onClick }) {
    const typeColors = {
    fire: '#f08030',
    grass: '#78c850',
    water: '#6890f0',
    bug: '#a8b820',
    normal: '#a8a878',
    poison: '#a040a0',
    electric: '#f8d030',
    ground: '#e0c068',
    fairy: '#ee99ac',
    fighting: '#c03028',
    psychic: '#f85888',
    rock: '#b8a038',
    ghost: '#705898',
    ice: '#98d8d8',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    flying: '#a890f0'
  };

  const primaryType = pokemon.types[0].type.name;
  const cardStyle = {
    backgroundColor: typeColors[primaryType] || '#a8a878',
    borderRadius: 25,
    
  };

  return (
    <div
      className="pokemon-card"
      onClick={() => onClick(pokemon)}
    style={cardStyle}
    >
      <div className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</div>
      <div className="pokemon-image-container">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <h2 className="pokemon-name">{pokemon.name}</h2>
    </div>
  );
}

export default PokemonCard;
