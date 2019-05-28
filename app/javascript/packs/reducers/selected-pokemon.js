export default (state = null, action) => {
  switch (action.type) {
    case "SHOW_POKEMON":
      return action.selectedPokemonId;

    default:
      return state;
  }
};
