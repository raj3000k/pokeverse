import { usePokemon } from "../hooks/usePokemon";

const Home = () => {
  const { pokemon, loading, error, source, searchByName, surpriseMe } =
    usePokemon();

  return (
    <div style={{ padding: "20px" }}>
      <input
        placeholder="Search Pokémon..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchByName((e.target as HTMLInputElement).value);
          }
        }}
      />

      <button onClick={surpriseMe} style={{ marginLeft: "10px" }}>
        🎲 Surprise Me
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            {pokemon.name} {source === "cache" && "⚡"}
          </h2>
          <img src={pokemon.image} width={200} />
          <p>Types: {pokemon.types.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
