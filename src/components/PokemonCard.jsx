function PokemonCard({ pokemon, onClick }) {
  return (
    <div
      className="pokemon-card"
      onClick={() => onClick(pokemon)}
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