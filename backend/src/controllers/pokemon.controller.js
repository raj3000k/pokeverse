const {
  fetchPokemonByName,
  fetchRandomPokemon,
  fetchPokemonList,
} = require("../services/pokemon.service");

const { getRecentSearches } = require("../cache/pokemon.cache");

const getPokemonByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        error: "INVALID_INPUT",
        message: "Pokemon name must be a valid string",
      });
    }

    const result = await fetchPokemonByName(name.toLowerCase());

    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.error || "INTERNAL_ERROR",
      message: err.message || "Something went wrong in Pokeverse",
    });
  }
};

const getRandomPokemon = async (req, res) => {
  try {
    const result = await fetchRandomPokemon();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.error || "INTERNAL_ERROR",
      message: err.message || "Something went wrong in Pokeverse",
    });
  }
};

const getRecentPokemons = (req, res) => {
  const recent = getRecentSearches();

  return res.status(200).json({
    count: recent.length,
    data: recent,
  });
};

const getPokemonList = async (req, res) => {
  try {
    const { limit = 20, offset = 0, sort } = req.query;

    const result = await fetchPokemonList({
      limit: Number(limit),
      offset: Number(offset),
      sort,
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.error || "INTERNAL_ERROR",
      message: err.message || "Something went wrong in Pokeverse",
    });
  }
};

module.exports = {
  getPokemonByName,
  getRandomPokemon,
  getRecentPokemons,
  getPokemonList,
};
