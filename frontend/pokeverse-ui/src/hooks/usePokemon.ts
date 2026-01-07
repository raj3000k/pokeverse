import { useState } from "react";
import {
  searchPokemon,
  getRandomPokemon,
  getRecentPokemons,
  getPokemonList,
} from "../services/api";

const PAGE_SIZE = 24;

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState<string>("id_asc");

  const searchByName = async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await searchPokemon(name);
      setPokemon(res.data);
      setSource(res.source);

      await loadRecent();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const surpriseMe = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getRandomPokemon();
      setPokemon(res.data);
      setSource(res.source);

      await loadRecent();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const loadRecent = async () => {
    try {
      const res = await getRecentPokemons();
      setRecent(res.data);
    } catch {
      setRecent([]);
    }
  };

  const loadGrid = async (reset = false, newSort?: string) => {
    try {
      setLoading(true);

      const appliedSort = newSort ?? sort;
      const currentOffset = reset ? 0 : offset;

      const res = await getPokemonList({
        limit: PAGE_SIZE,
        offset: currentOffset,
        sort: appliedSort,
      });

      if (reset) {
        setList(res.data);
        setOffset(PAGE_SIZE);
      } else {
        setList((prev) => [...prev, ...res.data]);
        setOffset(currentOffset + PAGE_SIZE);
      }

      setSort(appliedSort);
      setHasMore(res.data.length === PAGE_SIZE);
    } catch {
      setError("Failed to load Pokémon list");
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemon,
    list,
    recent,
    loading,
    error,
    source,
    hasMore,
    sort,
    searchByName,
    surpriseMe,
    loadRecent,
    loadGrid,
  };
};
