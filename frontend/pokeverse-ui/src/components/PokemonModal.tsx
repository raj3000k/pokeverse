import "./pokemon-modal.css";

const PokemonModal = ({ pokemon, onClose }: any) => {
  if (!pokemon) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">{pokemon.name}</h2>

        <img className="modal-image" src={pokemon.image} alt={pokemon.name} />

        <div className="stats">
          {Object.entries(pokemon.stats).map(
            ([key, value]: any) =>
              key !== "total" && (
                <div key={key} className="stat-row">
                  <span className="stat-name">{key}</span>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{ width: `${(value / 150) * 100}%` }}
                    />
                  </div>
                  <span className="stat-value">{value}</span>
                </div>
              )
          )}
        </div>

        <div className="meta">
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Base XP: {pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
