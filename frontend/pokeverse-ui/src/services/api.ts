import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1/pokeverse",
  timeout: 5000,
});

export const searchPokemon = async (name: string) => {
  const res = await api.get(`/pokemon/${name}`);
  return res.data;
};

export const getRandomPokemon = async () => {
  const res = await api.get("/pokemon/random");
  return res.data;
};

export const getRecentPokemons = async () => {
  const res = await api.get("/pokemon/recent");
  return res.data;
};

export const getPokemonList = async (params?: {
  limit?: number;
  offset?: number;
  sort?: string;
}) => {
  const res = await api.get("/pokemon", { params });
  return res.data;
};
