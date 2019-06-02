const filterPokemons = (state = "", action) => {
  switch (action.type) {
  case "FILTER_POKEMONS":
    return action.query;

  default:
    return state;
  }
};

export default filterPokemons;
