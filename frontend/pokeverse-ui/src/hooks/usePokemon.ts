import { useState } from "react";
import {
  searchPokemon,
  getRandomPokemon,
  getRecentPokemons,
} from "../services/api";

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);

  const searchByName = async (name: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await searchPokemon(name);
      setPokemon(res.data);
      setSource(res.source);
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

  return {
    pokemon,
    recent,
    loading,
    error,
    source,
    searchByName,
    surpriseMe,
    loadRecent,
  };
};
