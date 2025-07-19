import './PokemonModal.css';

function PokemonModal({ pokemon, onClose }) {
  const maxStat = 255; // The maximum possible value for a base stat

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
  const modalStyle = {
    '--type-color': typeColors[primaryType] || '#a8a878',
  };

  const statAbbreviations = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SPA',
    'special-defense': 'SPD',
    'speed': 'SPE'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-pokemon-profile">
          <div className="modal-image-wrapper">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="modal-image"
            />
          </div>
          <h2 className="modal-name">{pokemon.name}</h2>
          <p className="modal-id">#{pokemon.id.toString().padStart(3, '0')}</p>
          <div className="modal-details">
            <span className="detail-label">Type:</span> <span>{pokemon.types.map(t => t.type.name).join(', ')}</span>
            <span className="detail-label">Weight:</span> <span>{pokemon.weight / 10} kg</span>
            <span className="detail-label">Height:</span> <span>{pokemon.height / 10} m</span>
          </div>
        </div>

        <div className="modal-pokemon-stats">
          <h3 className="stats-title">Base Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="stat">
              <span className="stat-name">{statAbbreviations[stat.stat.name] || stat.stat.name}</span>
              <div className="stat-bar">
                <div 
                  className="stat-bar-inner"
                  style={{ '--stat-width': `${(stat.base_stat / maxStat) * 100}%` }}
                ></div>
              </div>
              <span className="stat-value">{stat.base_stat}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PokemonModal;