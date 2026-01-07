import { useEffect, useRef, useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import Loader from "../components/Loader";
import PokemonCard from "../components/PokemonCard";
import RecentSearches from "../components/RecentSearches";
import SearchBar from "../components/SearchBar";
import PokemonModal from "../components/PokemonModal";
import "../styles/grid.css";

type ViewMode = "grid" | "search";

const Home = () => {
  const {
    pokemon,
    list,
    recent,
    loading,
    error,
    source,
    hasMore,
    searchByName,
    surpriseMe,
    loadRecent,
    loadGrid,
  } = usePokemon();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showModal, setShowModal] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadRecent();
    loadGrid(true);
  }, []);

  useEffect(() => {
    if (viewMode !== "grid") return;
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadGrid();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [viewMode, hasMore, loading]);

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      <SearchBar
        onSearch={(name: string) => {
          searchByName(name);
          setViewMode("search");
          setShowModal(false);
        }}
        onSurprise={() => {
          surpriseMe();
          setViewMode("search");
          setShowModal(false);
        }}
        onHome={() => {
          setShowModal(false);
          setViewMode("grid");
          loadGrid(true);
        }}
        onSort={(sort: string) => {
          setViewMode("grid");
          loadGrid(true, sort);
        }}
      />

      <RecentSearches
        items={recent}
        onSelect={(name: string) => {
          searchByName(name);
          setViewMode("search");
          setShowModal(false);
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* GRID MODE */}
      {viewMode === "grid" && (
        <>
          <div className="grid">
            {list.map((p: any) => (
              <PokemonCard
                key={p.name}
                pokemon={{
                  ...p,
                  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
                  types: [],
                }}
                onClick={() => {
                  searchByName(p.name);
                  setViewMode("search");
                  setShowModal(false);
                }}
              />
            ))}
          </div>

          {/* INFINITE SCROLL SENTINEL */}
          {hasMore && (
            <div
              ref={loaderRef}
              style={{ height: "60px", marginTop: "20px" }}
            />
          )}

          {loading && <Loader />}
        </>
      )}

      {/* SEARCH MODE (CARD ONLY) */}
      {viewMode === "search" && pokemon && !showModal && (
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PokemonCard
            pokemon={pokemon}
            source={source}
            onClick={() => setShowModal(true)}
          />
        </div>
      )}

      {/* MODAL */}
      {pokemon && showModal && (
        <PokemonModal pokemon={pokemon} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Home;
