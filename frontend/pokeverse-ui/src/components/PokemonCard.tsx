import "./pokemon-card.css";

const PokemonCard = ({ pokemon, source, onClick }: any) => {
  return (
    <div className="pokemon-card" onClick={onClick}>
      <span className="pokemon-id">#{pokemon.id}</span>

      <img src={pokemon.image} alt={pokemon.name} />

      <h2>
        {pokemon.name}
        {source === "cache" && <span className="cache"> ⚡</span>}
      </h2>

      <div className="types">
        {pokemon.types.map((t: string) => (
          <span key={t} className={`type ${t}`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
