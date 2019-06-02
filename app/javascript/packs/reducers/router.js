import actionsTypes from "packs/actions/types";

export default (state = "pokedex", action) => {
  switch (action.type) {
  case actionsTypes.ROUTE:
    return action.page;

  default:
    return state;
  }
};
