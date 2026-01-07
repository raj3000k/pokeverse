const express = require("express");

const router = express.Router();

const {
  getPokemonByName,
  getRandomPokemon,
  getRecentPokemons,
  getPokemonList,
} = require("../controllers/pokemon.controller");

router.get("/pokemon/:name", getPokemonByName);

router.get("/pokemon/random", getRandomPokemon);

router.get("/pokemon/recent", getRecentPokemons);

router.get("/pokemon", getPokemonList);

module.exports = router;
