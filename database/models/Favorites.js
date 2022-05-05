const mongoose = require("mongoose");

const FavoritesSchema = new mongoose.Schema({
  num: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "You must provide a name."],
    dropDups: [true],
  },
  sprite: {
    type: String,
    required: [true],
  },
  shinySprite: {
    type: String,
    required: [true],
  },
  weight: {
    type: Number,
    required: [true],
  },
  height: {
    type: Number,
    required: [true],
  },
  comments: {
    type: Array,
  },
  type: {

  }
});

const Favorites = mongoose.model("Pokemon", PokemonSchema);

module.exports = Favorites;