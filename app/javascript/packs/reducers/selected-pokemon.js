import types from "packs/actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.SELECT_POKEMON:
      return action.selectedPokemon;

    default:
      return state;
  }
};
