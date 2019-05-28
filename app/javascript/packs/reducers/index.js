import { combineReducers } from "redux";

import isLoading from "./is-loading";
import pokemons from "./pokemons";
import filterPokemons from "./filter-pokemons";
import selectedPokemon from "./selected-pokemon";
import kinds from "./kinds";

export default combineReducers({
  isLoading,
  pokemons,
  selectedPokemon,
  filterPokemons,
  kinds
});
