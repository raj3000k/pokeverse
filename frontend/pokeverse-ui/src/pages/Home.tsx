import { useEffect, useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";
import RecentSearches from "../components/RecentSearches";
import SearchBar from "../components/SearchBar";
import PokemonModal from "../components/PokemonModal";

const Home = () => {
  const {
    pokemon,
    recent,
    loading,
    error,
    source,
    searchByName,
    surpriseMe,
    loadRecent,
  } = usePokemon();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadRecent();
  }, []);

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <SearchBar
        onSearch={searchByName}
        onSurprise={surpriseMe}
        onSort={() => {}}
      />

      <RecentSearches
        items={recent}
        onSelect={(name: string) => searchByName(name)}
      />

      {loading && <Loader />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && !loading && (
        <div style={{ marginTop: "40px" }}>
          <PokemonCard
            pokemon={pokemon}
            source={source}
            onClick={() => setOpen(true)}
          />
        </div>
      )}

      {open && (
        <PokemonModal pokemon={pokemon} onClose={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Home;
