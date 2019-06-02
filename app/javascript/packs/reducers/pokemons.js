import types from "packs/actions/types";

const pokemons = (state = [], action) => {
  switch (action.type) {
    case types.LIST_POKEMONS:
      return action.pokemons;

    case types.CREATE_POKEMON:
      return state.concat(action.pokemon);

    case types.DELETE_POKEMON:
      return state.filter(pokemon => pokemon.id != action.pokemonId);

    default:
      return state;
  }
};

export default pokemons;
