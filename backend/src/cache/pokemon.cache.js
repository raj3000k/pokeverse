const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 100;
const MAX_RECENT = 8;

const pokemonCache = new Map();
const recentSearches = [];

const isExpired = (entry) => {
  return Date.now() - entry.timestamp > CACHE_TTL;
};

const getFromCache = (key) => {
  const entry = pokemonCache.get(key);

  if (!entry) {
    return null;
  }

  if (isExpired(entry)) {
    pokemonCache.delete(key);
    return null;
  }

  return entry.data;
};

const setInCache = (key, data) => {
  if (pokemonCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = pokemonCache.keys().next().value;
    pokemonCache.delete(oldestKey);
  }

  pokemonCache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

const updateRecentSearches = (pokemon) => {
  const index = recentSearches.findIndex((p) => p.name === pokemon.name);

  if (index !== -1) {
    recentSearches.splice(index, 1);
  }

  recentSearches.unshift({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.image,
    types: pokemon.types,
  });

  if (recentSearches.length > MAX_RECENT) {
    recentSearches.pop();
  }
};

const getRecentSearches = () => {
  return recentSearches;
};

const getCacheSize = () => {
  return pokemonCache.size;
};

module.exports = {
  getFromCache,
  setInCache,
  updateRecentSearches,
  getRecentSearches,
  getCacheSize,
};
