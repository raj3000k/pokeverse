const axios = require("axios");

const {
  getFromCache,
  setInCache,
  updateRecentSearches,
} = require("../cache/pokemon.cache");

const POKE_API_BASE = "https://pokeapi.co/api/v2/pokemon";

const formatPokemon = (data) => {
  const stats = {};

  data.stats.forEach((s) => {
    stats[s.stat.name] = s.base_stat;
  });

  const totalStats = Object.values(stats).reduce((a, b) => a + b, 0);

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map((t) => t.type.name),
    stats: {
      ...stats,
      total: totalStats,
    },
    abilities: data.abilities.map((a) => a.ability.name),
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
  };
};

const fetchPokemonByName = async (name) => {
  const cached = getFromCache(name);
  if (!isNaN(Number(name))) {
    throw {
      status: 400,
      error: "INVALID_INPUT",
      message: "Pokemon name must be a string, not an ID",
    };
  }

  if (cached) {
    return {
      source: "cache",
      data: cached,
    };
  }

  try {
    const response = await axios.get(`${POKE_API_BASE}/${name}`);
    const formatted = formatPokemon(response.data);

    setInCache(name, formatted);
    updateRecentSearches(formatted);

    return {
      source: "api",
      data: formatted,
    };
  } catch (err) {
    if (err.response && err.response.status === 404) {
      throw {
        status: 404,
        error: "POKEMON_NOT_FOUND",
        message: "This Pokémon does not exist in the Pokeverse",
      };
    }

    throw {
      status: 502,
      error: "UPSTREAM_FAILURE",
      message: "Failed to fetch Pokémon from external API",
    };
  }
};

const fetchRandomPokemon = async () => {
  let attempts = 0;

  while (attempts < 5) {
    try {
      const randomId = Math.floor(Math.random() * 898) + 1;

      const response = await axios.get(`${POKE_API_BASE}/${randomId}`);
      const formatted = formatPokemon(response.data);

      setInCache(formatted.name, formatted);
      updateRecentSearches(formatted);

      return {
        source: "api",
        data: formatted,
      };
    } catch {
      attempts += 1;
    }
  }

  throw {
    status: 502,
    error: "UPSTREAM_FAILURE",
    message: "Failed to fetch random Pokémon after multiple attempts",
  };
};

const fetchPokemonList = async ({ limit, offset, sort }) => {
  try {
    const response = await axios.get(POKE_API_BASE, {
      params: { limit, offset },
    });

    let list = response.data.results.map((p, index) => ({
      name: p.name,
      url: p.url,
      id: offset + index + 1,
    }));

    if (sort === "name_desc") {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === "name_asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "id_desc") {
      list.sort((a, b) => b.id - a.id);
    } else {
      list.sort((a, b) => a.id - b.id);
    }

    return {
      count: response.data.count,
      data: list,
    };
  } catch {
    throw {
      status: 502,
      error: "UPSTREAM_FAILURE",
      message: "Failed to fetch Pokémon list",
    };
  }
};

module.exports = {
  fetchPokemonByName,
  fetchRandomPokemon,
  fetchPokemonList,
};
