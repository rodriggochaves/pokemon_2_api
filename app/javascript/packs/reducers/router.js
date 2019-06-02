import actionsTypes from "packs/actions/types";
import PokedexContainer from "packs/pokedex-container";

export default (state = PokedexContainer, action) => {
  switch (action.type) {
    case actionsTypes.ROUTE:
      return action.page;

    default:
      return state;
  }
};
