const express = require("express");
const cors = require("cors");

const pokemonRoutes = require("./routes/pokemon.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/pokeverse", pokemonRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "NOT_FOUND",
    message: "The requested route does not exist in Pokeverse",
  });
});

module.exports = app;
