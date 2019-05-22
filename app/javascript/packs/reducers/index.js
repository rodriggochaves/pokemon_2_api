import { combineReducers } from 'redux';

import isLoading from './is-loading';
import pokemons from './pokemons';
import filterPokemons from './filter-pokemons';
import pokemon from './pokemon';

export default combineReducers({
  isLoading,
  pokemons,
  pokemon,
  filterPokemons,
})
