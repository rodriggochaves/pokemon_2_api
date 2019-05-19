import { combineReducers } from 'redux';

import isLoading from './is-loading';
import pokemons from './pokemons';

export default combineReducers({
  isLoading,
  pokemons,
})
