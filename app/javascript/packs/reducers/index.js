import { combineReducers } from 'redux';

import isLoading from './is-loading';
import pokemons from './pokemons';
import filterPokemons from './filter-pokemons';

export default combineReducers({
  isLoading,
  pokemons,
  filterPokemons,
})
