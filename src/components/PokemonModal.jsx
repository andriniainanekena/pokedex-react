import './PokemonModal.css';

function PokemonModal({ pokemon, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
      </div>
    </div>
  );
}

export default PokemonModal;
